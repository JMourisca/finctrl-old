<template>
    <v-row>
        <v-col>
            <v-data-table
                :headers="headers"
                :items="serviceProviders"
                sort-by="name"
                class="elevation-1"
                :loading="loading"
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                item-key="name"
                show-expand
            >
                <template v-slot:item.creted="{ item }">
                    <span>Something</span>
                </template>
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Service Provider</v-toolbar-title>
                        <v-divider
                            class="mx-4"
                            inset
                            vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12">
                                                <v-text-field v-model="editedItem.name"
                                                              required
                                                              label="Name">
                                                </v-text-field>
                                            </v-col>
                                            <v-col cols="12">
                                                <v-textarea v-model="editedItem.description"
                                                            label="Description"></v-textarea>
                                            </v-col>
                                            <v-col cols="8">
                                                <v-text-field v-model="editedItem.address"
                                                              hint="Somethingstrasse 4, 1234 Zürich"
                                                              label="Address"></v-text-field>
                                            </v-col>
                                            <v-col cols="4">
                                                <v-text-field v-model="editedItem.phone"
                                                            hint="+41 78 666 32 12"
                                                            label="Phone"></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field v-model="editedItem.url"
                                                              hint="http://site.ch"
                                                              label="URL"></v-text-field>
                                            </v-col>
                                            <v-col cols="6">
                                                <v-text-field v-model="editedItem.email"
                                                            hint="email@email.com"
                                                            label="Email"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                        small
                        @click="deleteItem(item)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
                <template v-slot:expanded-item="{ headers, item }" class="elevation-0">
                    <td :colspan="headers.length" class="grey lighten-5">
                        <v-row>
                            <v-col>
                                <span class="subtitle-2 overline">Contact Information</span>
                            </v-col>
                        </v-row>
                        <v-row class="mt-2" v-if="item.description">
                            <v-col>
                                <v-banner two-line>
                                    {{item.description}}
                                </v-banner>
                            </v-col>
                        </v-row>
                        <v-row v-if="item.address || item.phone || item.url || item.email">
                            <v-col v-show="item.address || item.phone" sm="8" class="blue-grey--text text--lighten-1">
                                <font-awesome-icon icon="home"></font-awesome-icon>
                                <span>{{item.address || "Not Provided"}}</span>
                            </v-col>
                            <v-col v-show="item.address || item.phone" sm="4" class="blue-grey--text text--lighten-1">
                                <font-awesome-icon icon="phone"></font-awesome-icon>
                                {{item.phone || "Not Provided"}}
                            </v-col>
                            <v-col v-show="item.url || item.phone" sm="8" class="blue-grey--text text--lighten-1">
                                <font-awesome-icon icon="laptop"></font-awesome-icon>
                                <a v-if="item.url" :href="item.url">{{item.url}}</a>
                                <span v-else>Not Provided</span>
                            </v-col>
                            <v-col v-show="item.url || item.phone" sm="4" class="blue-grey--text text--lighten-1">
                                <font-awesome-icon icon="envelope"></font-awesome-icon>
                                <a v-if="item.email" :href="'mailto:' + item.email">{{item.email}}</a>
                                <span v-else>No Provided</span>
                            </v-col>
                        </v-row>
                        <v-row v-else>
                            <v-col>
                                <span class="grey--text">No information provided</span>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <span class="subtitle-2 overline">Bank/Taxes information</span>
                            </v-col>
                        </v-row>
                        <v-row v-if="item.bank || item.bank_address || item.ahv || item.iban || item.birthday">
                            <v-col v-show="item.bank" sm="12" class="blue-grey--text text--lighten-1">
                                <strong>{{item.bank}}</strong>
                            </v-col>
                            <v-col v-show="item.bank_address" sm="12" class="blue-grey--text text--lighten-1">
                                <font-awesome-icon icon="building"></font-awesome-icon>
                                {{item.bank_address || "Not Provided"}}
                            </v-col>
                            <v-col v-show="item.ahv || item.iban || item.birthday" sm="4"
                                   class="blue-grey--text text--lighten-1 small">
                                <strong>AHV</strong><br>
                                {{item.ahv || "Not Provided"}}
                            </v-col>
                            <v-col sm="5" class="blue-grey--text text--lighten-1 small">
                                <strong>IBAN</strong><br>
                                {{item.iban || "Not Provided"}}
                            </v-col>
                            <v-col sm="3" class="blue-grey--text text--lighten-1 small">
                                <strong>Date of Birth</strong><br>
                                <span v-if="item.birthday">{{item.birthday | dateFormat}}</span>
                                <span v-else>Not Provided</span>
                            </v-col>
                        </v-row>
                        <v-row v-else>
                            <v-col>
                                <span class="grey--text">No information provided</span>
                            </v-col>
                        </v-row>
                    </td>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script>
import moment from "moment";

export default {
    name: "ServiceProvider",
    data: () => ({
        dialog: false,
        expanded: [],
        singleExpand: true,
        loading: false,
        headers: [
            {
                text: 'Name',
                align: 'start',
                sortable: true,
                value: 'name',
            },
            {text: 'Description', value: 'description'},
            {text: 'Actions', value: 'actions', sortable: false},
            {text: '', value: 'data-table-expand'},
        ],
        serviceProviders: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            description: '',
            address: '',
            phone: '',
            iban: '',
            email: '',
            url: '',
            birthday: '',
            ahv: '',
            bank: '',
            bank_address: '',
        },
        defaultItem: {
            name: '',
            description: '',
            address: '',
            phone: '',
            iban: '',
            email: '',
            url: '',
            birthday: '',
            ahv: '',
            bank: '',
            bank_address: '',
        },
    }),
    filters: {
        dateFormat(value) {
            return moment.utc(value).format('DD.MM.YYYY')
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Service Provider' : 'Edit Service Provider'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {
            this.loading = true
            this.$finance.getServiceProviders().then((serviceProviders) => {
                this.serviceProviders = serviceProviders
            }).finally(() => {
                this.loading = false
            })
        },

        editItem(item) {
            this.editedIndex = this.serviceProviders.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            const index = this.serviceProviders.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.serviceProviders[this.editedIndex], this.editedItem)
            } else {
                this.serviceProviders.push(this.editedItem)
            }
            this.close()
        },
    },
}
</script>

<style scoped>
    >>> tr.v-data-table__expanded.v-data-table__expanded__content {
        box-shadow: none;
    }
</style>
