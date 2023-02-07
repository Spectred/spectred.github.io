---
imgArray2: [
    {href: 'https://forest.dtflyx.com/', src: 'https://forest.dtflyx.com/img/logo.png'}
]
---
# 工具箱


<div class="tool-box">
    <a  href="https://forest.dtflyx.com/">
        <img class="tool-img" src="https://forest.dtflyx.com/img/logo.png">
        <p class="tool-title">Forest</p>   
    </a>
    <p class="tool-desc">声明式HTTP客户端框架</p>
</div>    

<div class="tool-box">
    <a  href="https://mapstruct.org/">
        <img class="tool-img" src="https://mapstruct.org/images/favicon.ico">
         <p class="tool-title">MapStruct</p>  
    </a>
    <p class="tool-desc">代码生成器</p>
</div>  

<div class="tool-box">
    <a  href="https://arthas.aliyun.com/">
        <img class="tool-img" src="https://arthas.aliyun.com/images/favicon.ico">
         <p class="tool-title">Arthas</p>  
    </a>
    <p class="tool-desc">Java 应用诊断利器</p>
</div> 

<div class="tool-box">
    <a  href="https://spring.io/">
        <img class="tool-img" src="https://arthas.aliyun.com/images/favicon.ico">
         <p class="tool-title">Spring</p>  <br>
    </a>
    <p class="tool-desc">Java 应用诊断利器</p>
</div>  


<ul class="project-list">
    <li v-for="item in $frontmatter.imgArray2" class="project-list-item-wrap">
        <a class="clearfix project-list-item" :href="item.href" >
            <div class="fl cover">
                <img src="https://forest.dtflyx.com/img/logo.png"  width="64" height="64">
            </div>
            <div class="info">
                <h4 class="single-ellipsis info-title">Forest</h4>
                <p class="double-ellipsis info-des">声明式HTTP客户端框架</p>
            </div>
        </a>
    </li>
    <li v-for="item in $frontmatter.imgArray2">{{item.href}}</li>
   <!-- <li class="project-list-item-wrap">
        <a class="clearfix project-list-item" href="https://forest.dtflyx.com/" >
            <div class="fl cover">
                <img src="https://forest.dtflyx.com/img/logo.png"  width="64" height="64">
            </div>
            <div class="info">
                <h4 class="single-ellipsis info-title">Forest</h4>
                <p class="double-ellipsis info-des">声明式HTTP客户端框架</p>
            </div>
        </a>
    </li>
   <li class="project-list-item-wrap">
        <a class="clearfix project-list-item" href="https://spring.io/" >
            <div class="fl cover">
                <img src="https://arthas.aliyun.com/images/favicon.ico"  width="64" height="64">
            </div>
            <div class="info">
                <h4 class="single-ellipsis info-title">Arthas</h4>
                <p class="double-ellipsis info-des">Java 应用诊断利器，声明式HTTP客户端框架</p>
            </div>
        </a>
    </li> -->
</ul>
