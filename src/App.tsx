import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Helper from './components/Helper';
import Modal from './components/Modal';
import Pagenator from './components/Pagenator';
import Cards from './components/Cards';
import './App.css';


type AppDataType = Array<{[key: string]: any}[]>;
type NodeDataType = {[key: string]: any} | undefined;

const urlRequest: string = "https://api.tvmaze.com/shows?page=1";
// const film = {
//     "id": 250,
//     "url": "https://www.tvmaze.com/shows/250/kirby-buckets",
//     "name": "Kirby Buckets",
//     "type": "Scripted",
//     "language": "English",
//     "genres": [
//         "Comedy"
//     ],
//     "status": "Ended",
//     "runtime": 30,
//     "averageRuntime": 30,
//     "premiered": "2014-10-20",
//     "officialSite": "http://disneyxd.disney.com/kirby-buckets",
//     "schedule": {
//         "time": "07:00",
//         "days": [
//             "Monday",
//             "Tuesday",
//             "Wednesday",
//             "Thursday",
//             "Friday"
//         ]
//     },
//     "rating": {
//         "average": null
//     },
//     "weight": 0,
//     "network": {
//         "id": 25,
//         "name": "Disney XD",
//         "country": {
//             "name": "United States",
//             "code": "US",
//             "timezone": "America/New_York"
//         }
//     },
//     "webChannel": {
//         "id": 83,
//         "name": "DisneyNOW",
//         "country": {
//             "name": "United States",
//             "code": "US",
//             "timezone": "America/New_York"
//         }
//     },
//     "dvdCountry": null,
//     "externals": {
//         "tvrage": 37394,
//         "thetvdb": 278449,
//         "imdb": "tt3544772"
//     },
//     "image": {
//         "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg",
//         "original": "https://static.tvmaze.com/uploads/images/original_untouched/1/4600.jpg"
//     },
//     "summary": "<p>The single-camera series that mixes live-action and animation stars Jacob Bertrand as the title character. <b>Kirby Buckets</b> introduces viewers to the vivid imagination of charismatic 13-year-old Kirby Buckets, who dreams of becoming a famous animator like his idol, Mac MacCallister. With his two best friends, Fish and Eli, by his side, Kirby navigates his eccentric town of Forest Hills where the trio usually find themselves trying to get out of a predicament before Kirby's sister, Dawn, and her best friend, Belinda, catch them. Along the way, Kirby is joined by his animated characters, each with their own vibrant personality that only he and viewers can see.</p>",
//     "updated": 1617744408,
//     "_links": {
//         "self": {
//             "href": "https://api.tvmaze.com/shows/250"
//         },
//         "previousepisode": {
//             "href": "https://api.tvmaze.com/episodes/1051658"
//         }
//     }
// };

const App: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [limitElements, setLimitElements] = useState<number>(50);
  const [appData, setAppData] = useState<AppDataType>([]);
  const [dataEnable, setDataEnable] = useState<boolean>(false);
  const [headerFixed, setHeaderFixed] = useState<boolean>(false);
  const [nodeData, setNodeData] = useState<NodeDataType>(undefined);

  useEffect(() => {
      fetch(urlRequest)
        .then(result => result.json())
        .then(result => {
          setAppData(prepareData(result, limitElements));
          setDataEnable(true);
        });
  }, [])

  useEffect(() => {
    if(dataEnable) {
      setAppData(prepareData(appData.flat(2), limitElements));
    }
  }, [limitElements]);

  function onChangePage(numberPage: number): void {
    setPage(numberPage);
  }

  function onChangeFixed(fixed: boolean): void {
    setHeaderFixed(fixed);
  }

  function onChangeLimit(limit: string): void {
    setLimitElements(Number(limit));
  }

  function closeModal(): void {
    setNodeData(undefined);
  }

  function openModal(id: string): void {
    let current = undefined;

    for(let i=0; i < appData.length && !current; i++) {
      for(let j=0; j < appData[i].length && !current; j++) {
        if(id === appData[i][j].id) {
          current = appData[i][j];
        }
      }
    }
    setNodeData(current);
  }

  function prepareData(data: Array<{}>, limit: number): AppDataType {
    let appData: AppDataType = [],
        page: number = 0,
        numb: number = data.length;

    while(numb) {
      appData.push([]);
      for(let j=0; j < limit && numb; j++, numb--) {
        appData[page].push(data[limit * page + j]);
      }
      page++;
    }

    return appData;
  }

  return (
    <div className="container">
      <Helper
        limit={ limitElements }
        fixed={ headerFixed }
        onChangeLimit={ onChangeLimit }
        onChangeFixed={ onChangeFixed }
      />
      <Modal data={ nodeData } onClose={ closeModal }/>
      <Header fixed={ headerFixed }/>
      <div className="content">
        { dataEnable && <Cards data={ appData[page] } onOpen={ openModal }/> }
      </div>
      { dataEnable &&
          <Pagenator
            page={ page }
            maxPage={ appData.length }
            onChangePage={ onChangePage }
          />
      }
    </div>
  );
}

export default App;
