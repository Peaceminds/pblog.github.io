<template>
  <div class="add-blog">
    <h2>add-Blog</h2>
    <form v-if="!submmited">
      <label>Title</label>
      <input type="text" v-model="blog.title" required />

      <label>content</label>
      <textarea v-model="blog.content"></textarea>

      <div id="checkboxes">
        <label>Vue.js</label>
        <input type="checkbox" value="Vue.js" v-model="blog.categories" />
        <label>Node.js</label>
        <input type="checkbox" value="Node.js" v-model="blog.categories" />
        <label>React.js</label>
        <input type="checkbox" value="React.js" v-model="blog.categories" />
        <label>Angular4.js</label>
        <input type="checkbox" value="Angular4" v-model="blog.categories" />
      </div>
      <label>作者:</label>
      <select v-model="blog.author">
        <option v-for="author in authors" :key="author">{{ author }}</option>
      </select>
      <button v-on:click.prevent="post">添加博客</button>
    </form>

    <div v-if="submmited">
      <h3>您的博客发布成功！</h3>
    </div>

    <div id="preview">
      <h3>Blog review</h3>
      <p>Blog title: {{blog.title}}</p>
      <p>Blog content:</p>
      <p>{{blog.content}}</p>
      <p>博客分类:</p>
      <ul>
        <li v-for="category in blog.categories" :key="category">{{ category }}</li>
      </ul>
      <p>作者：{{ blog.author }}</p>
    </div>

    <hr />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddBlog",
  data() {
    return {
      blog: {
        title: "",
        content: "",
        category: "",
        categories: [],
        author: ""
      },
      authors: ["Hemiah", "Henry", "Bucky"],
      submmited: false
    };
  },
  methods: {
    post: function() {
      axios
        .post("/posts.json", this.blog)
        .then((data) => { // ES6箭头函数可以避免使用this的传递
          console.log(data);
          this.submmited = true;
        });
    }
  }
};
</script>

<style scoped>
#add-blog * {
  box-sizing: border-box;
}

#add-blog {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}

label {
  display: block;
  margin: 20px 0 10px;
}

input[type="text"],
textarea,
select {
  width: 100%;
  height: 100%;
  border: 3px none #cccccc;
  border: 1px solid black;
  box-sizing: border-box;
}

textarea {
  height: 200px;
}

#checkboxes label {
  display: inline-block;
  margin-top: 0;
}

#checkboxes input {
  display: inline-block;
  margin-right: 10px;
}

button {
  display: block;
  margin: 20px 0;
  background: crimson;
  color: #fff;
  border: 0;
  padding: 14px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
}

#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}

h3 {
  margin-top: 10px;
}
</style>
