import ShowBlogs from './components/ShowBlogs'
import AddBlogs from './components/AddBlog'
import SingleBlog from './components/SingleBlog'

export default[
    {path:"/", component:ShowBlogs},
    {path:"/add", component:AddBlogs},
    {path:"/bl/:id", component:SingleBlog}
]