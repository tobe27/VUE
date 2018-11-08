<template>
  <div class="layout">
    <Row>
      <Col span="24">
        <Card class="card" :bordered="false" :padding="0">
          <OverView />
        </Card>
      </Col>
    </Row>
    <Row>
      <Col span="15">
        <Card class="card" :bordered="false" :padding="0">
          <Map />
        </Card>
      </Col>
      <Col span="9">
          <Card class="card" :bordered="false" :padding="0">
            <Navigation />
          </Card>
          <Card class="card" :bordered="false" :padding="0" style="margin-top: 16px;">
            <Information />
          </Card>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <Card class="card" :bordered="false" :padding="0">
          <LineChart />
        </Card>
        <Card class="card" :bordered="false" :padding="0" style="margin-top: 16px;">
          <HistogramChart />
        </Card>
      </Col>
      <Col span="12">
        <Card class="card" :bordered="false" :padding="0">
          <Ranking />
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import OverView from './components/OverView'
import Information from './components/Information'
import LineChart from './components/LineChart'
import HistogramChart from './components/HistogramChart'
import Navigation from './components/Navigation'
import Ranking from './components/Ranking'
import Map from "./components/Map";

export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    OverView,
    Information,
    LineChart,
    HistogramChart,
    Navigation,
    Ranking,
    Map
  }
}
</script>

<style lang="scss" scoped>
.layout {
  margin: 16px;
  .card {
    margin: 8px;
  }
}
</style>
