<script lang="ts" setup>
import { ComputedRef, Ref, computed, defineProps, shallowRef } from 'vue';
import { Table, Tag } from 'ant-design-vue';
import { IShow } from '../interfaces';

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

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});

const columns: Ref<IColumn[]> = shallowRef([
  {
    customCell: cellCustomEffect,
    dataIndex: 'image',
    title: 'Обложка',
    key: 'image',
    width: 100
  },
  {
    dataIndex: 'name',
    title: 'Название',
    key: 'name'
  },
  {
    dataIndex: 'genres',
    title: 'Жанр',
    key: 'genres',
    width: 100,
    slots: { customRender: 'genres' }
  },
  {
    dataIndex: 'country',
    title: 'Страна',
    key: 'country'
  },
  {
    dataIndex: 'runtime',
    title: 'Длительность(мин)',
    key: 'runtime'
  },
  {
    dataIndex: 'rating',
    title: 'Рейтинг',
    key: 'rating',
    slots: { customRender: 'rating' }
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
)

function cellCustomEffect() {
  return {
    style: { cursor: 'pointer' },
    onClick: () => console.log('CLick!!!')
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

</script>

<template>
  <Table bordered :columns="columns" :data-source="dataTable" :pagination="true">
    <template #genres="{ record }">
      <Tag v-for="item in record.genres" color="processing" :key="item">{{item}}</Tag>
    </template>
    <template #rating="{ text }">
      <Tag v-if="text" :color="getColorRating(text)" >{{text}}</Tag>
    </template>
  </Table>
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
