<template>
    <v-container>
        <h1>Online Payments</h1>
        <v-row>
            <v-col>
                <v-tabs
                    v-model="tab"
                    background-color="primary accent-4"
                    class="elevation-2"
                    dark
                    :centered="centered"
                    :grow="grow"
                    :vertical="vertical"
                    :right="right"
                    :prev-icon="prevIcon ? 'mdi-arrow-left-bold-box-outline' : undefined"
                    :next-icon="nextIcon ? 'mdi-arrow-right-bold-box-outline' : undefined"
                    :icons-and-text="icons"
                >
                    <v-tab
                        v-for="(item, i) in tabs"
                        :key="i"
                        :href="`#tab-${i}`"
                        v-on:click="getData(item)"
                    >
                        {{item}}
                    </v-tab>

                    <v-tab-item
                        v-for="(item, i) in tabs"
                        :key="i"
                        :value="'tab-' + i"
                    >
                        <v-card
                            flat
                            tile
                        >
                            <v-card-text>
                                <div class="text-center" v-if="loading">
                                    <v-progress-circular
                                        indeterminate color="primary"
                                        :size="70"
                                        :width="6"
                                    ></v-progress-circular>
                                </div>
                                <v-data-table
                                    :headers="headers"
                                    :items="data"
                                    sort-by="name"
                                    class="elevation-1"
                                >
                                    <template #item.complete_value="{item}">
                                        {{ item.value_currency }} {{ item.value }}
                                    </template>
                                    <template #item.url="{item}">
                                        <a :href="item.url" target="_blank">{{ item.url }}</a>
                                    </template>
                                    <!--                                    <template v-slot:top>-->
                                    <!--                                        <v-toolbar flat color="white">-->
                                    <!--                                            <v-toolbar-title>My CRUD</v-toolbar-title>-->
                                    <!--                                            <v-divider-->
                                    <!--                                                class="mx-4"-->
                                    <!--                                                inset-->
                                    <!--                                                vertical-->
                                    <!--                                            ></v-divider>-->
                                    <!--                                            <v-spacer></v-spacer>-->
                                    <!--                                            <v-dialog v-model="dialog" max-width="500px">-->
                                    <!--                                                <template v-slot:activator="{ on }">-->
                                    <!--                                                    <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>-->
                                    <!--                                                </template>-->
                                    <!--                                                <v-card>-->
                                    <!--                                                    <v-card-title>-->
                                    <!--                                                        <span class="headline">{{ formTitle }}</span>-->
                                    <!--                                                    </v-card-title>-->

                                    <!--                                                    <v-card-text>-->
                                    <!--                                                        <v-container>-->
                                    <!--                                                            <v-row>-->
                                    <!--                                                                <v-col cols="12" sm="6" md="4">-->
                                    <!--                                                                    <v-text-field v-model="data.name"-->
                                    <!--                                                                                  label="Name"></v-text-field>-->
                                    <!--                                                                </v-col>-->
                                    <!--                                                                <v-col cols="12" sm="6" md="4">-->
                                    <!--                                                                    <v-text-field v-model="data.description"-->
                                    <!--                                                                                  label="Description"></v-text-field>-->
                                    <!--                                                                </v-col>-->
                                    <!--                                                                <v-col cols="12" sm="6" md="4">-->
                                    <!--                                                                    <v-text-field v-model="data.url"-->
                                    <!--                                                                                  label="URL"></v-text-field>-->
                                    <!--                                                                </v-col>-->
                                    <!--                                                                <v-col cols="12" sm="6" md="4">-->
                                    <!--                                                                    <v-text-field v-model="editedItem.carbs"-->
                                    <!--                                                                                  label="Carbs (g)"></v-text-field>-->
                                    <!--                                                                </v-col>-->
                                    <!--                                                                <v-col cols="12" sm="6" md="4">-->
                                    <!--                                                                    <v-text-field v-model="editedItem.protein"-->
                                    <!--                                                                                  label="Protein (g)"></v-text-field>-->
                                    <!--                                                                </v-col>-->
                                    <!--                                                            </v-row>-->
                                    <!--                                                        </v-container>-->
                                    <!--                                                    </v-card-text>-->

                                    <!--                                                    <v-card-actions>-->
                                    <!--                                                        <v-spacer></v-spacer>-->
                                    <!--                                                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>-->
                                    <!--                                                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>-->
                                    <!--                                                    </v-card-actions>-->
                                    <!--                                                </v-card>-->
                                    <!--                                            </v-dialog>-->
                                    <!--                                        </v-toolbar>-->
                                    <!--                                    </template>-->
                                    <!--                                    <template v-slot:item.actions="{ item }">-->
                                    <!--                                        <v-icon-->
                                    <!--                                            small-->
                                    <!--                                            class="mr-2"-->
                                    <!--                                            @click="editItem(item)"-->
                                    <!--                                        >-->
                                    <!--                                            mdi-pencil-->
                                    <!--                                        </v-icon>-->
                                    <!--                                        <v-icon-->
                                    <!--                                            small-->
                                    <!--                                            @click="deleteItem(item)"-->
                                    <!--                                        >-->
                                    <!--                                            mdi-delete-->
                                    <!--                                        </v-icon>-->
                                    <!--                                    </template>-->
                                    <!--                                    <template v-slot:no-data>-->
                                    <!--                                        <v-btn color="primary" @click="initialize">Reset</v-btn>-->
                                    <!--                                    </template>-->
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "online-payments",
    data() {
        return {
            dialog: false,
            loading: false,
            tab: null,
            icons: false,
            centered: false,
            grow: false,
            vertical: true,
            prevIcon: false,
            nextIcon: false,
            right: false,
            tabs: ["ALL"],
            data: [],
            currency: "",
            headers: [
                {text: "Name", value: "name"},
                {text: "Description", value: "description"},
                {text: "Url", value: "url"},
                {text: "Value", value: "complete_value"},
                {text: "Frequency", value: "frequency"},
            ]
        }
    },
    created() {
        this.initialize()
    },
    methods: {
        getData: function (currency) {
            this.loading = true
            this.$finance.getOnlinePayments(currency).then((payments) => {
                this.data = payments
                this.loading = false
            })
        },
        initialize: function () {
            let _this = this
            this.loading = true
            this.$finance.getOPCurrencies().then((currencies) => {
                this.tabs = this.tabs.concat(currencies["currencies"])
                _this.getData(this.tabs[0])
            })
        },
        editItem(item) {
            console.log(item)
        },
        deleteItem(item) {

        }
    }
}
</script>

<style scoped>

</style>
