<template>
    <v-row>
        <v-col>
            <v-data-table
                :headers="headers"
                :items="paymentTypes"
                sort-by="calories"
                class="elevation-1"
                :loading="loading"
            >
                <template v-slot:item.creted="{ item }">
                    <span>Something</span>
                </template>
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Payment Types</v-toolbar-title>
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
                                <v-form @submit.prevent="save" ref="form" v-model="valid" lazy-validation id="pt-form">
                                    <v-card-title>
                                        <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="12" md="12">
                                                    <v-text-field v-model="editedItem.name"
                                                                  hint="Master 1234 / Paypal. Do not add the complete credit card number."
                                                                  :rules="[v => !!v || 'Name is required']"
                                                                  label="Name"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="12" md="12">
                                                    <v-textarea v-model="editedItem.description"
                                                                rows="2"
                                                                label="Description"></v-textarea>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" text @click="close">Cancel</v-btn>
                                        <v-btn color="primary" text type="submit" form="pt-form">Save</v-btn>
                                    </v-card-actions>
                                </v-form>
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
            </v-data-table>
        </v-col>
    </v-row>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "PaymentTypes",
    data: () => ({
        valid: true,
        dialog: false,
        loading: false,
        headers: [
            {
                text: 'Name',
                align: 'start',
                sortable: true,
                value: 'name',
            },
            {text: 'Description', value: 'description'},
            {text: '', value: 'actions', sortable: false},
        ],
        // paymentTypes: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            description: '',
        },
        defaultItem: {
            name: '',
            description: '',
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Payment Type' : 'Edit Payment Type'
        },
        ...mapState([
            'paymentTypes'
        ])
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
    },

    methods: {
        editItem(item) {
            this.editedIndex = this.paymentTypes.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            const index = this.paymentTypes.indexOf(item)
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
            if (!this.$refs.form.validate()) {
                return false
            }
            this.$store.dispatch('modifyPaymentType', this.editedItem, this.editedIndex)
            this.close()
        },
    },
}
</script>

<style scoped>

</style>
