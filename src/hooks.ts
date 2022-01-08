import { Ref, ref } from 'vue';
import { IShow } from './interfaces';

const URL_SHOWS = 'https://api.tvmaze.com/shows?page=1';

export const useData = () => {
  const data: Ref<IShow[]> = ref([]);
  const error: Ref<boolean> = ref(false);
  const loading: Ref<boolean> = ref(true);
  const fetching = async () => {
    try {
      const response = await fetch(URL_SHOWS);
      if(!response.ok) {
        throw Error('Bad request result!');
      }
      data.value = await response.json();
      loading.value = false;
    }
    catch(e: any) {
      error.value = true;
      console.log('ERROR:', e);
    }
  }

  fetching();

  return { data, error, loading };
}
