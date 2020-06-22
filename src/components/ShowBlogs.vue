<template>
  <!-- *** 过滤 *** -->
  <div v-theme:column="'narrow'" id="show-blogs">
    <h1>Show - Blogs</h1>

    <!-- *** 搜索 *** -->
    <input type="text" v-model="search" placeholder="Search" />
    <div v-for="blog in filterBlogs" class="single-blog" :key="blog.title">
      <router-link v-bind:to="'/bl/' + blog.id">
        <h2 v-bigred>{{blog.title | to-uppercase2}}</h2>
      </router-link>
      <article>{{blog.content | snippet}}</article>
    </div>
  </div>
</template>

<script>
import axios from "../axios-auth";
export default {
  name: "show-blogs",
  data() {
    return {
      blogs: [],
      search: ""
    };
  },
  created() {
    // *** 远程请求test
    // this.$http.get('https://jsonplaceholder.typicode.com/posts')
    // .then(function(data){
    //   // console.log(data);
    //   this.blogs = data.body.slice(0,10);
    //   console.log(this.blogs);
    // })

    // *** axios + firebase数据库请求Ver.
    axios.get("/posts.json")
    .then(function(data){
      return data.data;
    })
    .then((data) => {
      var blogsArray = [];
      for(let key in data){
        data[key].id = key;
        blogsArray.push(data[key]);
      }
      this.blogs = blogsArray;
    })
  },
  computed: {
    filterBlogs: function() {
      return this.blogs.filter(blog => {
        return blog.title.match(this.search);
      });
    }
  },
  // 过滤器的本地化
  filters: {
    toUppercase2(v) {
      return v.toUpperCase();
    }
  },
  // 指令的本地化
  directives: {
    bigred: {
      bind(el, binding, vnode) {
        el.style.color = "red";
      }
    }
  }
};
</script>

<style>
#show-blogs {
  max-width: 800px;
  margin: 0 auto;
}

.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
  border: 1px dotted #aaa;
}

#show-blogs a {
  color: #444;
  text-decoration: none;
}

input[type="text"] {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}
</style>
