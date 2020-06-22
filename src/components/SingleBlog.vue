<template>
  <div id="single-blog">
    <h1>{{blog.title}}</h1>
    <article>{{blog.content}}</article>
    <p>作者：{{blog.author}}</p>
    <p>分类：</p>
    <ul>
      <li v-for="category in blog.categories" :key="category">{{category}}</li>
    </ul>
    <button @click="deleteSingleBlog()">删除</button>
    <router-link :to="'/edit/' + id">编辑</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "single-blog",
  data() {
    return {
      id: this.$route.params.id,
      blog: {}
    };
  },
  // // vue-resource
  // created() {
  //   this.$http
  //     .get("https://vue-bgbd.firebaseio.com/posts/" + this.id + ".json")
  //     .then(function(data) {
  //       // console.log(data);
  //       return data.json();
  //     })
  //     .then(function(data) {
  //       this.blog = data;
  //     });
  // },
  // methods: {
  //   deleteSingleBlog() {
  //     // console.log(this.id);
  //     this.$http
  //       .delete("https://vue-bgbd.firebaseio.com/posts/" + this.id + ".json")
  //       .then(response => {
  //         this.$router.push({ path: "/" });
  //       });
  //   }
  // }
  created() {
    var _this = this;
    axios
      .get("/posts/" + this.id + ".json")
      .then(function(data) {
        console.log(data);
        _this.blog = data.data;
        return data.data;
      });
  },
  methods: {
    deleteSingleBlog() {
      axios
        .delete("/posts/" + this.id + ".json")
        .then(response => {
          this.$router.push({ path: "/" });
        });
    }
  }
};
</script>

<style>
#single-blog {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background: #eee;
  border: 1px dotted #aaa;
}
</style>
