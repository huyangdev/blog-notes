const e=JSON.parse('{"key":"v-1ebdb0c0","path":"/juc_notes/JUC05_%E7%BA%BF%E7%A8%8B%E6%B1%A0%E4%B8%8E%E5%B9%B6%E5%8F%91%E5%B7%A5%E5%85%B7.html","title":"线程池详解","lang":"en-US","frontmatter":{"title":"线程池详解","icon":"page","author":"Jimmy","date":"2023-07-16T00:00:00.000Z","order":5,"category":["java","JUC"],"tag":["并发"],"sticky":false,"star":true,"footer":"Footer test","copyright":"jimi","description":"记录 线程池，自定义线程池","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog-notes/dist/juc_notes/JUC05_%E7%BA%BF%E7%A8%8B%E6%B1%A0%E4%B8%8E%E5%B9%B6%E5%8F%91%E5%B7%A5%E5%85%B7.html"}],["meta",{"property":"og:title","content":"线程池详解"}],["meta",{"property":"og:description","content":"记录 线程池，自定义线程池"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://mister-hope.github.io/blog-notes/dist/"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"线程池详解"}],["meta",{"property":"article:author","content":"Jimmy"}],["meta",{"property":"article:tag","content":"并发"}],["meta",{"property":"article:published_time","content":"2023-07-16T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"线程池详解\\",\\"image\\":[\\"https://mister-hope.github.io/blog-notes/dist/\\"],\\"datePublished\\":\\"2023-07-16T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Jimmy\\"}]}"]]},"headers":[{"level":1,"title":"自定义线程池","slug":"自定义线程池","link":"#自定义线程池","children":[{"level":2,"title":"第一步：自定义拒绝策略接口 RejectPolicy","slug":"第一步-自定义拒绝策略接口-rejectpolicy","link":"#第一步-自定义拒绝策略接口-rejectpolicy","children":[]},{"level":2,"title":"第二步：自定义阻塞队列","slug":"第二步-自定义阻塞队列","link":"#第二步-自定义阻塞队列","children":[]},{"level":2,"title":"第三步：自定义线程池 ThreadPool","slug":"第三步-自定义线程池-threadpool","link":"#第三步-自定义线程池-threadpool","children":[]},{"level":2,"title":"第四步：测试","slug":"第四步-测试","link":"#第四步-测试","children":[]}]},{"level":1,"title":"JDK提供的线程池","slug":"jdk提供的线程池","link":"#jdk提供的线程池","children":[{"level":2,"title":"1) 线程池状态","slug":"_1-线程池状态","link":"#_1-线程池状态","children":[]},{"level":2,"title":"2) 构造方法","slug":"_2-构造方法","link":"#_2-构造方法","children":[]},{"level":2,"title":"线程池的工作方式","slug":"线程池的工作方式","link":"#线程池的工作方式","children":[]}]},{"level":1,"title":"JDK Executors类中提供的工厂方法","slug":"jdk-executors类中提供的工厂方法","link":"#jdk-executors类中提供的工厂方法","children":[{"level":2,"title":"newFixedThreadPool","slug":"newfixedthreadpool","link":"#newfixedthreadpool","children":[]},{"level":2,"title":"newCachedThreadPool","slug":"newcachedthreadpool","link":"#newcachedthreadpool","children":[]},{"level":2,"title":"newSingleThreadExecutor","slug":"newsinglethreadexecutor","link":"#newsinglethreadexecutor","children":[]},{"level":2,"title":"(用于)提交任务(的几个方法)","slug":"用于-提交任务-的几个方法","link":"#用于-提交任务-的几个方法","children":[]},{"level":2,"title":"(用于)关闭线程池(的方法)","slug":"用于-关闭线程池-的方法","link":"#用于-关闭线程池-的方法","children":[]},{"level":2,"title":"shutdownNow","slug":"shutdownnow","link":"#shutdownnow","children":[]},{"level":2,"title":"其它方法","slug":"其它方法","link":"#其它方法","children":[]}]},{"level":1,"title":"创建多少线程数量合适","slug":"创建多少线程数量合适","link":"#创建多少线程数量合适","children":[{"level":2,"title":"CPU 密集型运算","slug":"cpu-密集型运算","link":"#cpu-密集型运算","children":[]},{"level":2,"title":"I/O 密集型运算","slug":"i-o-密集型运算","link":"#i-o-密集型运算","children":[]}]},{"level":1,"title":"任务调度线程池","slug":"任务调度线程池","link":"#任务调度线程池","children":[{"level":2,"title":"java.util.Timer","slug":"java-util-timer","link":"#java-util-timer","children":[]},{"level":2,"title":"ScheduledExecutorService","slug":"scheduledexecutorservice","link":"#scheduledexecutorservice","children":[{"level":3,"title":"定时器：scheduleAtFixedRate","slug":"定时器-scheduleatfixedrate","link":"#定时器-scheduleatfixedrate","children":[]}]}]},{"level":1,"title":"正确处理执行任务异常","slug":"正确处理执行任务异常","link":"#正确处理执行任务异常","children":[{"level":2,"title":"方法1：主动捉异常","slug":"方法1-主动捉异常","link":"#方法1-主动捉异常","children":[]},{"level":2,"title":"方法2：使用 Future","slug":"方法2-使用-future","link":"#方法2-使用-future","children":[]}]},{"level":1,"title":"应用之定时任务","slug":"应用之定时任务","link":"#应用之定时任务","children":[{"level":2,"title":"定期执行","slug":"定期执行","link":"#定期执行","children":[]}]},{"level":1,"title":"Tomcat (的)线程池(策略)","slug":"tomcat-的-线程池-策略","link":"#tomcat-的-线程池-策略","children":[{"level":2,"title":"扩展了 ThreadPoolExecutor","slug":"扩展了-threadpoolexecutor","link":"#扩展了-threadpoolexecutor","children":[]},{"level":2,"title":"tomcat有关线程池的配置","slug":"tomcat有关线程池的配置","link":"#tomcat有关线程池的配置","children":[{"level":3,"title":"Connector 配置","slug":"connector-配置","link":"#connector-配置","children":[]},{"level":3,"title":"Executor 线程配置","slug":"executor-线程配置","link":"#executor-线程配置","children":[]}]}]},{"level":1,"title":"Fork/Join (分治思想)","slug":"fork-join-分治思想","link":"#fork-join-分治思想","children":[{"level":2,"title":"概念","slug":"概念","link":"#概念","children":[]},{"level":2,"title":"使用","slug":"使用","link":"#使用","children":[]}]},{"level":1,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":17.29,"words":5187},"filePathRelative":"juc_notes/JUC05_线程池与并发工具.md","localizedDate":"July 16, 2023","excerpt":"<p>记录 <code>线程池</code>，<code>自定义线程池</code></p>\\n","autoDesc":true}');export{e as data};
