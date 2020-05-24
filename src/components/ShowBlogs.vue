<template>

  <!-- *** 过滤 *** -->
  <!-- v-theme为含参自定义指令，v-crainbow为不含参自定义指令 -->
  <!-- main.js中处理传参时，字符串需要加单引号 -->
  <!-- <div v-theme="'narrow'" id="show-blogs"> -->
  <div v-theme:column="'narrow'" id="show-blogs">
    <h1>Show - Blogs</h1>

    <!-- *** 搜索 *** -->
    <!-- 建议搜索可以通过对 "blog in blogs | xxx" 的内容过滤实现，但Vue建议，数值变化时使用Computed计算属性 -->
    
    <input type="text" v-model="search" placeholder="Search">
    <!-- <div v-for="blog in blogs" class="single-blog"> -->
      <!-- 上面是遍历普通属性的，下面这个是遍历有值发生变化属性的 -->
    <div v-for="blog in filterBlogs" class="single-blog">
      <!-- 管道符号| 实现自定义过滤 -->
      <!-- crainbow为全局指令-->
      <!-- <h2 v-crainbow>{{blog.title | to-uppercase2}}</h2>  -->
      <router-link v-bind:to="'/bl/' + blog.id">
        <h2 v-bigred>{{blog.title | to-uppercase2}}
        </h2>
      </router-link>
      <article>
        <!-- {{blog.body | snippet}} -->
        {{blog.content | snippet}}
      </article>
    </div>
  </div>
</template>

<script>

export default {
  name: 'show-blogs',
  data(){
    return{
      blogs:[],
      search:""
    }
  },
  created(){
    // *** 远程请求Ver.
    // this.$http.get('https://jsonplaceholder.typicode.com/posts')
    // .then(function(data){
    //   // console.log(data);
    //   this.blogs = data.body.slice(0,10);
    //   console.log(this.blogs);
    // })

    // *** 本地请求Ver.（仅能放在static目录下）
    // this.$http.get('../../static/posts.json')

    // *** 数据库请求Ver.
    this.$http.get('https://vue-bgbd.firebaseio.com/posts.json')
    .then(function(data){
      // this.blogs = data.body.slice(0,10);
      // console.log(this.blogs);
      // console.log("--->>> ");
      // console.log(data.json());
      return data.json()
    })
    .then(function(data){
      var blogsArray = [];
      for(let key in data){
        // console.log(key);
        // console.log(data[key]);
        data[key].id = key;
        blogsArray.push(data[key]);
      }
      // console.log(blogsArray);
      this.blogs = blogsArray;
      console.log(this.blogs);
    })
  },
  computed: {
    filterBlogs:function(){
      return this.blogs.filter((blog) => {
        return blog.title.match(this.search); // 找到时会返回true
      })
    }
  },
  // 过滤器的本地化（相对于全局版）
  filters: {
    // （一）
    // "to-uppercase2":function(v){
    //   return v.toUpperCase();
    // }
    // （二）ES6以方法形式写
    toUppercase2(v){
      return v.toUpperCase();
    }
  },
  // 指令的本地化（相对于全局版）
  directives:{
    'bigred':{
      bind(el,binding,vnode) {
        el.style.color = "red";
      }
    }
  }
}
</script>

<style>
#show-blogs{
  max-width: 800px;
  margin: 0 auto;
}

.single-blog{
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
  border: 1px dotted #aaa;
}

#show-blogs a{
  color: #444;
  text-decoration: none;
}

input[type="text"]{
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

</style>
