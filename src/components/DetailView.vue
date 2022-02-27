<script lang="ts" setup>
import {
  Col,
  Collapse,
  CollapsePanel,
  Descriptions,
  DescriptionsItem,
  Image,
  Modal,
  Rate,
  Row
} from 'ant-design-vue';
import { defineEmits, defineProps, Ref, shallowRef } from 'vue';
import { INetwork, ISchedule, IShow } from '../interfaces';
const emit = defineEmits(['close']);
const props = defineProps({
  show: { type: Object, required: true }
})

const { genres, runtime, schedule } = props.show as IShow;

const show: Ref<IShow> = shallowRef(props.show);
const genresShow: Ref<string> = shallowRef(genres.join(' | '));
const scheduleShow: Ref<string> = shallowRef(getScheduleShow(schedule));
const style: Ref<any> = shallowRef({ fontWeight: '600' });

function getNameNetwork(network: INetwork) {
  return network?.name ?? '';
}

function getScheduleShow({ days, time }: ISchedule) {
  const translatedDays: string[] = days.map(getTranslatedDay);
  return `${translatedDays.join(' | ')} в ${time} (${runtime} мин)`
}

function getStatus(status: string) {
  return { 'Ended': 'Закончен', 'Running': 'Идёт'}[status];
}

function getTranslatedDay(day: string) {
  return {
    'Monday': 'Понедельник',
    'Thuesday': 'Вторник',
    'Wednesday': 'Среда',
    'Thursday': 'Четверг',
    'Friday': 'Пятница',
    'Saturday': 'Суббота',
    'Sunday': 'Воскресенье',
  }[day];
}

console.log(genres, props.show);

</script>

<template>
  <Modal centered visible width="1024px" wrap-class-name="detail-view" :footer="null" :title="show.name" @cancel="emit('close')">
    <Row>
      <Col>
        <Image :src="show.image.original"></Image>
      </Col>
      <Col :span="17" v-html="show.summary"></Col>
    </Row>
    <Collapse>
      <CollapsePanel header="Информация о шоу">
        <Descriptions :label-style="style">
          <DescriptionsItem label="Канал">{{ getNameNetwork(show.network) }}</DescriptionsItem>
          <DescriptionsItem label="Статус">{{ getStatus(show.status) }}</DescriptionsItem>
          <DescriptionsItem label="Тип">{{ show.type }}</DescriptionsItem>
          <DescriptionsItem label="Жанры">{{ genresShow }}</DescriptionsItem>
        </Descriptions>
        <Descriptions :column="1" :label-style="style">
          <DescriptionsItem label="Расписание">{{ scheduleShow }}</DescriptionsItem>
          <DescriptionsItem label="Официальный сайт">
            <a :href="show.officialSite">{{ show.officialSite }}</a>
          </DescriptionsItem>
        </Descriptions>
        <Rate allow-half disabled :count="10" :value="show.rating.average" />{{ show.rating.average }}
      </CollapsePanel>
    </Collapse>
  </Modal>
</template>

<style lang="less">
  .detail-view {
    .ant-modal {
      &-body {
        padding: 8px;
        .ant-image-img {
          width: 270px;
        }
        & > .ant-row {
          min-height: 370px;
          padding-bottom: 8px;
          .ant-col:not(:first-child) {
            padding-left: 8px;
          }
        }
      }
    }
  }
</style>
