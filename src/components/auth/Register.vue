<template>
    <div class="page-wrapper login-form">
        <h2 class="login-heading">Register</h2>
        <form @submit.prevent="validateBeforeSubmit">

            <!-- <div v-if="successMessage" class="success-message">{{ successMessage }}</div> -->

            <div v-if="serverErrors" class="server-error">
                <div v-for="(value, key) in serverErrors" :key="key">
                    {{ value[0] }}
                </div>
            </div>

            <div class="form-control">
                <label for="name">Name</label>
                <input type="text" :class="{ 'input-error': errors.has('email') }" name="name" id="name" class="login-input" v-validate="'required|min:3'" v-model="name">
                <span class="form-error">{{ errors.first('name') }}</span>
            </div>

            <div class="form-control">
                <label for="email">Email</label>
                <input type="email" :class="{ 'input-error': errors.has('email') }" name="email" id="email" class="login-input" v-validate="'required|email'" v-model="email">
                <span class="form-error">{{ errors.first('email') }}</span>
            </div>

            <div class="form-control mb-more">
                <label for="password">Password</label>
                <input type="password" :class="{ 'input-error': errors.has('email') }" name="password" id="password" class="login-input" v-validate="'required|min:6'" v-model="password">
                <span class="form-error">{{ errors.first('password') }}</span>
            </div>

            <div class="form-control">
                <button type="submit" class="btn-submit">Create Account</button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    name: 'register',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            serverErrors: '',
            successMessage: '',
            successMessage: ''
        }
    },
    methods: {
        validateBeforeSubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                // eslint-disable-next-line
                // alert('Form Submitted!');
                this.register()
                // return;
                }

                // alert('Correct them errors!');
            });
        },
        register() {
            this.$store.dispatch('register', {
                name: this.name,
                email: this.email,
                password: this.password
            })
                .then(response => {
                    this.successMessage = 'Registered Successfully!'
                    this.$router.push({ name: 'login', params: { dataSuccessMessage: this.successMessage } })
                    this.$toast.success({
                        title: this.successMessage,
                        message:'You can login here'
                    })
                })
                .catch(error => {
                    this.serverErrors = Object.values(error.response.data.errors)
                })
        }
    }
}
</script>