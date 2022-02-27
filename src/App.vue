<script lang="ts" setup>
import { ComputedRef, computed, unref } from 'vue';
import { Alert, Layout, LayoutContent, LayoutHeader, /*LayoutFooter,*/ Spin } from 'ant-design-vue';
import Filters from './components/Filters.vue';
// import Footer from './components/Footer.vue';
import Table from './components/Table.vue';
import { useData } from './hooks';
import { IShow } from './interfaces';

const { data, error, loading } = useData();

// const filteredShows: Ref<IShow[]> = ref([]);

const genres: ComputedRef<string[]> = computed(() => {
  if(!unref(data).length) { return [] }
  return unref(data).reduce((acc, show: IShow) => {
    show.genres.forEach((genre: string) => {
      if(!acc.includes(genre)) {
        acc.push(genre);
      }
    });
    return acc;
  }, []);
});

// watch(filteredShows, (values) => {
//   console.log("FILTERED", values);
// })

</script>

<template>
  <Alert v-if="error" :message="error" />
  <Spin v-else size="large" :spinning="loading" tip="Загрузка...">
    <Layout>
      <LayoutHeader>
        <Filters :genres="genres" :shows="data" />
      </LayoutHeader>
      <LayoutContent>
        <Table :data="data" />
      </LayoutContent>
      <!-- <LayoutFooter>
        <Footer />
      </LayoutFooter> -->
    </Layout>
  </Spin>
</template>

<style lang="less">
  @header-height: 50px;
  @footer-height: 0px;
  @content-height: calc(100% - @header-height - @footer-height);
  html, body {
    height: 100%;
    overflow: hidden;
    margin: 0;
  }
  #app {
    background: lightgray;
    box-sizing: border-box;
    padding: 10px;
    height: 100%;
    overflow: auto;
    width: 100%;
    main {
      height: @content-height;
      overflow: auto;
    }
    footer {
      height: @footer-height;
      padding: 10px;
    }
    header {
      background: inherit;
      height: @header-height;
      padding: 10px 30px;
    }
    section {
      height: 100%;
    }
    .ant {
      &-spin {
        &-nested-loading,
        &-container {
          height: 100%;
        }
      }
    }
    button {
      background: darken(red, 10%);
      color: white;
      margin: 10px;
    }
  }
</style>
