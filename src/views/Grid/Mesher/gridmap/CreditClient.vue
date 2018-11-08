<template>
    <div class="chart">
        <div class="title">
            <div class="tabs">
                <span>授信用户数量</span>
                <ButtonGroup class="month">
                    <Button>本月</Button>
                    <Button>本季</Button>
                    <Button>全年</Button>
                </ButtonGroup>
            </div>
        </div>

        <ve-line :data="chartData" :settings="chartSettings" height="350px">
        </ve-line>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                chartSettings: {
                    dimension: ['日期']
                },
                chartData: {
                    columns: ['日期', ''],
                    rows: [
                        {'日期': '1', '': 1393},
                        {'日期': '2', '': 3530},
                        {'日期': '3', '': 2923},
                        {'日期': '4', '': 1723},
                        {'日期': '5', '': 3792},
                        {'日期': '6', '': 4593},
                    ]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .chart {
        .title {
            padding: 8px;
            height: 50px;
            font-size: 14px;
            border-bottom: 1px solid #ddd;

            span {
                line-height: 34px;
            }

            .tabs {
                .month {
                    float: right;
                }
            }
        }

    }
</style>
