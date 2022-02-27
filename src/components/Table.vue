<script lang="ts" setup>
import { ComputedRef, Ref, computed, defineProps, shallowRef } from 'vue';
import { Image, Table, Tag } from 'ant-design-vue';
import { IShow } from '../interfaces';
import DetailView from './DetailView.vue';

interface IColumn {
  dataIndex: string,
  key: number | string,
  title: string
}
interface IDataRow {
  image: string,
  name: string,
  genres: string[],
  country: string,
  runtime: number,
  rating: number | null,
  key: number
}
interface IShowById { [id: number]: IShow }

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});

const activeShow: Ref<IShow> = shallowRef(null);
const columns: Ref<IColumn[]> = shallowRef([
  {
    customCell: cellCustomEffect,
    dataIndex: 'image',
    title: 'Обложка',
    width: 100,
    slots: { customRender: 'image' }
  },
  {
    customCell: cellCustomEffect,
    dataIndex: 'name',
    title: 'Название',
    sorter: (a, b) => a.name.localeCompare(b.name)
  },
  {
    dataIndex: 'genres',
    title: 'Жанр',
    width: 100,
    slots: { customRender: 'genres' }
  },
  {
    dataIndex: 'country',
    title: 'Страна',
    width: '15%'
  },
  {
    align: 'center',
    dataIndex: 'runtime',
    title: 'Длительность(мин)',
    width: 170
  },
  {
    align: 'center',
    dataIndex: 'rating',
    title: 'Рейтинг',
    slots: { customRender: 'rating' },
    sorter: (a, b) => a.rating - b.rating,
    width: '15%'
  }
]);

const dataTable: ComputedRef<IDataRow[]> = computed(() =>
  props.data.map((show: IShow): IDataRow => ({
    image: show.image.medium,
    name: show.name,
    genres: show.genres,
    country: show.network?.country?.name ?? '',
    runtime: show.runtime,
    rating: show.rating.average,
    key: show.id
  }))
);
const showsById: ComputedRef<IShowById> = computed(() =>
  (props.data as IShow[]).reduce(
    (acc: IShowById, show: IShow) => ({ ...acc, [show.id]: acc[show.id] ?? show }), {}
  )
);

function cellCustomEffect({ key }: any): void {
  return {
    style: { cursor: 'pointer' },
    onClick: () => { activeShow.value = showsById.value[key]; }
  };
}

function getColorRating(value: number = 0): string {
  if(value > 8) {
    return 'success';
  }
  else if(value > 6) {
    return 'processing';
  }
  else if(value > 3) {
    return 'warning';
  }
  else {
    return 'error';
  }
}

function onClose() {
  activeShow.value = null;
}

</script>

<template>
  <Table bordered :columns="columns" :data-source="dataTable">
    <template #image="{ text }">
      <Image :src="text" />
    </template>
    <template #genres="{ record }">
      <Tag v-for="item in record.genres" color="processing" :key="item">{{item}}</Tag>
    </template>
    <template #rating="{ text }">
      <Tag v-if="text" :color="getColorRating(text)" >{{text}}</Tag>
    </template>
  </Table>
  <DetailView v-if="activeShow" :show="activeShow" @close="onClose" />
</template>

<style lang="less">
  @height-pag: 32px;
  @margin-pag: 10px;
  @height-table: calc(100% - @height-pag - 2 * @margin-pag);

  .ant {
    &-table-wrapper {
      height: 100%;
      .ant-table {
        height: @height-table;
        overflow: auto;
        td:first-child {
          padding: 1px;
        }
        td:nth-child(2) {
          font-style: italic;
          font-weight: 600;
        }
        .ant-tag {
          margin: 2px;
        }
      }
      .ant-pagination.ant-table-pagination {
        height: @height-pag;
        margin: @margin-pag;
      }
    }
  }
</style>
