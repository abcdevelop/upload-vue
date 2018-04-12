<template>
  <v-container fluid fill-height>

    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout align-center justify-center v-else>
      <v-flex xs12 sm8 md4>
        <form @submit.prevent="onSubmit">
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Upload dialog</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-alert type="info" :value="upload">
                'Upload effectué !'
              </v-alert>
              <img :src="imageUrl" height="150px">
            </v-card-text>
            <v-card-actions>
              <input
                type="file"
                style="display:none"
                ref="imageInput"
                accept="image/*"
                @change="onImagePicked">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="onPickImage" v-show="image==null">Pick an Image</v-btn>
              <v-btn color="primary" type="submit" v-show="image!=null">Upload the Image</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </form>
      </v-flex>
    </v-layout>

  </v-container>

</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'UploadImage',
    data() {
      return {
        imageUrl: '',
        image: null,
        upload: false
      }
    },
    computed: {
      ...mapGetters([
        'loading'
      ])
    },
    methods: {
      ...mapActions({
        uploadImage: 'uploadImage'
      }),
      onPickImage() {
        this.$refs.imageInput.click()
      },
      onImagePicked(event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Choisissez une image valide!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      },
      onSubmit() {
        if (!this.image) {
          return
        }
        const payload = {
          image: this.image
        }
        this.uploadImage(payload).then(() => {
          this.upload = true
          setTimeout(() => {
            this.upload = false
            this.imageUrl = ''
            this.image = null
          }, 3000)
        })
      }
    }
  }
</script>

<style lang="stylus">
  @import '../stylus/main'
</style>
