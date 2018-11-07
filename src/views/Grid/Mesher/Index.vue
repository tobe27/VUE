<template>
    <div>
        <div class="gridMapBreadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/grid">网格管理</BreadcrumbItem>
                <BreadcrumbItem>查看</BreadcrumbItem>
            </Breadcrumb>
        </div>
    <div class="layout">
        <Row>
            <Col>
            <Card class="card1" :bordered="false" :padding="0">
                <Map/>
            </Card>
            </Col>
            <Col>
            <Card class="card2" :bordered="false" :padding="0">
                <GridDetail/>
            </Card>
            </Col>
        </Row>
        <Row>
            <Col>
            <Card class="card3" :bordered="false" :padding="0">
                <CreditClient/>
            </Card>
            </Col>
            <Col>
            <Card class="card4" :bordered="false" :padding="0">
                <LetterClient/>
            </Card>
            </Col>
            <Col>
            <Card class="card5" :bordered="false" :padding="0">
                <ProductHolding/>
            </Card>
            </Col>
        </Row>
    </div>
    </div>
</template>

<script>
    import Map from './gridmap/Map'
    import GridDetail from './gridmap/GridDetail'
    import CreditClient from './gridmap/CreditClient.vue'
    import LetterClient from './gridmap/LetterClient'
    import ProductHolding from './gridmap/ProductHolding'


    export default {
        name: 'mesher',
        data() {
            return {
            }
        },
        mounted() {
        },
        components: {
            Map,
            GridDetail,
            CreditClient,
            LetterClient,
            ProductHolding
        }
    }
</script>

<style lang="scss">
    .gridMapBreadcrumb {
        height: 54px;
        background-color: #fff;
        font-size: 14px;
        font-family:PingFangSC-Regular;
        line-height: 54px;
        padding-left: 24px;
        border-radius: 4px;
        border: 1px solid #eee;
    }
    .layout {
        margin: 24px;
        .card1 {
            float: left;
            width: 70%;
            height: 650px;
        }
        .card2 {
            margin-left: 1%;
            float: left;
            width: 29%;
            height: 650px;
        }
        .card3 {
            margin-top: 15px;
            float: left;
            width: 35%;
        }
        .card4 {
            margin-top: 15px;
            margin-left: 1%;
            float: left;
            width: 34%;
        }
        .card5 {
            margin-top: 15px;
            margin-left: 1%;
            float: left;
            width: 29%;
        }
    }
</style>
