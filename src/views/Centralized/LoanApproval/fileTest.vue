<template>
    <div>
        <Button @click="modal11 = true">查看信贷系统查询结果</Button>
        <Modal v-model="modal11" fullscreen >
            <!-- v-html="text1"-->
            <div v-html="text1">{{text1}}</div>

        </Modal>
    </div>
</template>

<script>
    import actions from '@/store/action-types'

    export default {
        name: "file-test",
        data() {
            return {
                text1:'',
                modal11:false
            }
        },
        mounted(){
            var that=this
            this.$store.dispatch(actions.get.file_TEST_LIST).then(rep => {
                let a=rep.data.data
                let b=a.split('报告结束')
                that.text1='<!DOCTYPE HTML'+b[0].split("<!DOCTYPE HTML")[1]
                console.log(b[0])
            })
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>