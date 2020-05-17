<template>
    <v-container>
        <h1>Online Payments</h1>
        <v-row>
            <v-col>
                <AlertMessage></AlertMessage>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-tabs
                    v-model="tab"
                    background-color="primary accent-4"
                    class="elevation-2"
                    dark
                    :vertical="true">
                    <v-tab
                        v-for="(item, i) in tabs"
                        :key="i"
                        :href="`#tab-${i}`"
                        v-on:click="getData(item)">
                        {{item}}
                    </v-tab>

                    <v-tab-item
                        v-for="(item, i) in tabs"
                        :key="i"
                        :value="'tab-' + i">
                        <v-card
                            flat
                            tile>
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
                                    class="elevation-0"
                                    v-show="!loading">
                                    <template #item.complete_value="{item}">
                                        {{ item.value_currency }} {{ item.value }}
                                    </template>
                                    <template #item.url="{item}">
                                        <a :href="item.url" target="_blank">{{ item.url }}</a>
                                    </template>
                                    <template #item.frequency="{item}">
                                        {{ options["frequencies"][item.frequency] }}
                                    </template>
                                    <template #item.payment="{item}">
                                        {{ paymentTypeName(item) }}
                                    </template>
                                    <template v-slot:top>
                                        <v-toolbar flat color="white">
                                            <v-spacer></v-spacer>
                                            <v-dialog v-model="dialog" max-width="500px">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                                                </template>
                                                <v-card>
                                                    <v-form @submit.prevent="save" ref="form" v-model="valid"
                                                            lazy-validation id="op-form">
                                                        <v-card-title>
                                                            <span class="headline">{{ formTitle }}</span>
                                                        </v-card-title>

                                                        <v-card-text>
                                                            <v-container>
                                                                <v-row>
                                                                    <v-col cols="12">
                                                                        <v-text-field v-model="editedItem.name"
                                                                                      clearable
                                                                                      :rules="rules.name"
                                                                                      required
                                                                                      label="Name"></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12">
                                                                        <v-textarea v-model="editedItem.description"
                                                                                    rows="2"
                                                                                    clearable
                                                                                    label="Description"></v-textarea>
                                                                    </v-col>
                                                                    <v-col cols="12">
                                                                        <v-text-field v-model="editedItem.url"
                                                                                      clearable
                                                                                      label="URL"></v-text-field>
                                                                    </v-col>

                                                                    <v-col cols="6">
                                                                        <v-select v-model="editedItem.value_currency"
                                                                                  :items="options['currencies']"
                                                                                  required
                                                                                  :rules="rules.currency"
                                                                                  label="Currency"></v-select>
                                                                    </v-col>
                                                                    <v-col cols="6">
                                                                        <v-currency-field v-model="editedItem.value"
                                                                                          clearable
                                                                                          required
                                                                                          :rules="rules.value"
                                                                                          label="Value"></v-currency-field>
                                                                    </v-col>
                                                                    <v-col cols="6">
                                                                        <v-select v-model="editedItem.payment"
                                                                                  :items="paymentTypes"
                                                                                  item-text="name"
                                                                                  item-value="id"
                                                                                  :rules="rules.payment"
                                                                                  required
                                                                                  label="Payment Type"></v-select>
                                                                    </v-col>
                                                                    <v-col cols="6">
                                                                        <v-select v-model="editedItem.frequency"
                                                                                  :items="options['frequencies_kv']"
                                                                                  item-text="value"
                                                                                  item-value="key"
                                                                                  :rules="rules.frequency"
                                                                                  required
                                                                                  label="Frequency"></v-select>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-container>
                                                        </v-card-text>
                                                        <v-card-actions>
                                                            <v-spacer></v-spacer>
                                                            <v-btn color="primary" text @click="close">Cancel
                                                            </v-btn>
                                                            <v-btn color="primary"
                                                                   text
                                                                   type="submit"
                                                                   form="op-form">Save
                                                            </v-btn>
                                                        </v-card-actions>
                                                    </v-form>
                                                </v-card>
                                            </v-dialog>
                                        </v-toolbar>
                                    </template>
                                    <template v-slot:body.append>
                                        <v-dialog
                                            v-model="deleteDialog"
                                            max-width="390"
                                        >
                                            <v-card>
                                                <v-card-title class="headline">Are you sure you want to delete this
                                                    item?
                                                </v-card-title>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn
                                                        color="primary darken-1"
                                                        text
                                                        @click="deleteDialog = false">
                                                        Cancel
                                                    </v-btn>
                                                    <v-btn
                                                        color="error darken-1"
                                                        text
                                                        :disabled="loading"
                                                        @click="deleteOP()">
                                                        Delete
                                                    </v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </v-dialog>
                                    </template>
                                    <template v-slot:item.actions="{ item }">
                                        <v-icon
                                            small
                                            class="mr-2"
                                            @click="editItem(item)">
                                            mdi-pencil
                                        </v-icon>
                                        <v-icon
                                            small
                                            @click="deleteItem(item)">
                                            mdi-delete
                                        </v-icon>
                                    </template>
                                    <template v-slot:no-data>
                                        <v-btn color="primary" @click="initialize">Reset</v-btn>
                                    </template>
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
import {mapState} from 'vuex'
import AlertMessage from "../components/notifications/AlertMessage";


export default {
    name: "online-payments",
    components: {
        AlertMessage,
    },
    data() {
        return {
            valid: true,
            dialog: false,
            rules: {
                name: [
                    v => !!v || 'Name is required',
                ],
                value: [
                    v => !!v || 'Value is required',
                    // v => /(\d+\(.)/.test(v) || 'Value must have the format 99.99'
                ],
                currency: [v => !!v || 'Currency is required'],
                frequency: [v => !!v || 'Frequency is required'],
                payment: [v => !!v || 'Payment type is required']
            },
            deleteDialog: false,
            tab: null,
            loading: false,
            tabs: ["ALL"],
            data: [],
            currency: "",
            toDelete: -1,
            headers: [
                {text: "Name", value: "name"},
                {text: "Description", value: "description"},
                {text: "Url", value: "url"},
                {text: "Value", value: "complete_value"},
                {text: "Payment", value: "payment"},
                {text: "Frequency", value: "frequency"},
                {text: '', value: 'actions', sortable: false},
            ],
            editedItem: {
                name: "",
                description: "",
                url: "",
                value_currency: "",
                value: "",
                payment: "",
                frequency: ""
            },
            defaultItem: {
                name: "",
                description: "",
                url: "",
                value_currency: "",
                value: "",
                payment: "",
                frequency: ""
            }
        }
    },
    created() {
        this.initialize()
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        ...mapState([
            'options',
            'paymentTypes',

        ]),
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
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
            this.editedIndex = this.data.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteItem(item) {
            this.toDelete = item
            this.deleteDialog = true
        },
        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
            this.loading = false
        },
        save() {
            if (!this.$refs.form[0].validate()) {
                return false
            }

            if (this.editedIndex > -1) {
                Object.assign(this.data[this.editedIndex], this.editedItem)
            } else {
                this.data.push(this.editedItem)
            }
            let payload = this.editedItem
            if (payload.hasOwnProperty("id")) {
                this.$finance.putOnlinePayments(payload).then(() => {
                    this.alert("success", "Online Payment updated.")
                    this.close()
                }).catch(() => {
                    this.alert("error", "There was an error with the update.")
                })
            } else {
                this.$finance.postOnlinePayments(payload).then(() => {
                    this.alert("success", "Online Payment inserted.")
                    this.close()
                }).catch(() => {
                    this.alert("error", "There was an error with the update.")
                })
            }
        },
        deleteOP() {
            const index = this.data.indexOf(this.toDelete)
            this.$finance.deleteOnlinePayment(this.toDelete.id).then(() => {
                this.data.splice(index, 1)
                this.deleteDialog = false
                this.alert("success", "Online Payment deleted.")
            }).catch(() => {
                this.alert("error", "There was an error with the update.")
            })
        },
        paymentTypeName(item) {
            const filtered = this.paymentTypes.filter((p) => p.id === item.payment)

            if (filtered.length > 0) {
                return filtered[0].name
            }

            return ""
        },
        alert(type, message) {
            this.$store.dispatch('showAlert', {message: message, type: type})
        }
    }
}
</script>

<style scoped>

</style>
