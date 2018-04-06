<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title>Upload dialog</v-toolbar-title>
                  <!--<v-spacer></v-spacer>-->
                  <!--<v-tooltip bottom>-->
                  <!--<v-btn-->
                  <!--icon-->
                  <!--large-->
                  <!--:href="source"-->
                  <!--target="_blank"-->
                  <!--slot="activator"-->
                  <!--&gt;-->
                  <!--<v-icon large>code</v-icon>-->
                  <!--</v-btn>-->
                  <!--<span>Source</span>-->
                  <!--</v-tooltip>-->
                </v-toolbar>
                <!--<v-card-text>-->
                <!--<v-form>-->
                <!--<v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>-->
                <!--<v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>-->
                <!--</v-form>-->
                <!--</v-card-text>-->
                <v-card-actions>
                  <v-btn color="primary" @click="onPickImage">Upload Image</v-btn>
                  <input
                    type="file"
                    style="display:none"
                    ref="imageInput"
                    accept="image/*"
                    @change="onImagePicked"
                  >
                  <img :src="imageUrl" height="150">
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        imageUrl: '',
        image: null
      }
    },
    methods: {
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

        // form action
        if (!this.image) {
          return
        }
        const imageData = {
          image: this.image
        }
        console.log('uploadImage in App.vue')
        this.$store.dispatch('uploadImage', imageData)
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
