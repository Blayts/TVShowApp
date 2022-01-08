<script lang="ts" setup>
import { ComputedRef, Ref, computed, defineEmits, defineProps, ref, unref } from 'vue';
import { Input, Select, Row } from 'ant-design-vue';
import { IShow } from '../interfaces';

interface IOptionSelect {
  label: string,
  value: string
}

const emit = defineEmits(['update:filtered']);
const props = defineProps({
  genres: {
    type: Array,
    default: () => []
  },
  shows: {
    type: Array,
    default: () => []
  },
});

const genre: Ref<string> = ref('');
const name: Ref<string> = ref('');

const options: ComputedRef<IOptionSelect> = computed(() =>
  props.genres.map((genre: string) => ({ label: genre, value: genre }))
);
const filtered: ComputedRef<any> = computed(() => {
  const fileredShows: IShow[] = props.shows.filter((show: IShow) =>
    show?.genres.includes(unref(genre)) ?? false
  );
  // const searchedShows: IShow[] = fileredShows.filter((show: IShow) =>
  //   show.name.compareLocale(unref(name))
  // );
  console.log('UPDATE', fileredShows);
  emit('update:filtered', fileredShows);
  return fileredShows;
});

console.log(filtered);

</script>

<template>
  <div style="display: none">{{filtered}}</div>
  <Row align="middle" justify="space-between">
    <Input placeholder="Поиск по имени..." v-model:value="name" />
    <Select placeholder="Выберите жанр" v-model:value="genre" :allow-clear="true" :options="options" />
  </Row>
</template>

<style lang="less" scoped>
  .ant {
    &-input,
    &-select {
      width: 200px;
    }
    &-row {
      height: 100%;
    }
  }
</style>
