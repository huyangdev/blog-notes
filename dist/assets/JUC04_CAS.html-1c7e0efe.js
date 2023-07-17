const e=JSON.parse('{"key":"v-4d51e030","path":"/java/juc_notes/JUC04_CAS.html","title":"CAS自旋锁","lang":"en-US","frontmatter":{"title":"CAS自旋锁","icon":"page","author":"Jimmy","date":"2023-07-16T00:00:00.000Z","order":4,"category":["java","JUC"],"tag":["并发"],"sticky":false,"star":true,"footer":"Footer test","copyright":"jimi","description":"记录 CAS 与 volatile，原子整数，原子累加器，Unsafe","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/blog-notes/dist/java/juc_notes/JUC04_CAS.html"}],["meta",{"property":"og:title","content":"CAS自旋锁"}],["meta",{"property":"og:description","content":"记录 CAS 与 volatile，原子整数，原子累加器，Unsafe"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://mister-hope.github.io/blog-notes/dist/"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"CAS自旋锁"}],["meta",{"property":"article:author","content":"Jimmy"}],["meta",{"property":"article:tag","content":"并发"}],["meta",{"property":"article:published_time","content":"2023-07-16T00:00:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CAS自旋锁\\",\\"image\\":[\\"https://mister-hope.github.io/blog-notes/dist/\\"],\\"datePublished\\":\\"2023-07-16T00:00:00.000Z\\",\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Jimmy\\"}]}"]]},"headers":[{"level":1,"title":"无锁","slug":"无锁","link":"#无锁","children":[]},{"level":1,"title":"问题提出：如何保证取款方法的线程安全","slug":"问题提出-如何保证取款方法的线程安全","link":"#问题提出-如何保证取款方法的线程安全","children":[]},{"level":1,"title":"使用不加锁的方式解决上述问题","slug":"使用不加锁的方式解决上述问题","link":"#使用不加锁的方式解决上述问题","children":[]},{"level":1,"title":"CAS 与 volatile","slug":"cas-与-volatile","link":"#cas-与-volatile","children":[]},{"level":1,"title":"原子整数","slug":"原子整数","link":"#原子整数","children":[]},{"level":1,"title":"AtomicXXXReference","slug":"atomicxxxreference","link":"#atomicxxxreference","children":[]},{"level":1,"title":"字段更新器","slug":"字段更新器","link":"#字段更新器","children":[]},{"level":1,"title":"原子累加器","slug":"原子累加器","link":"#原子累加器","children":[]},{"level":1,"title":"(底层类)Unsafe","slug":"底层类-unsafe","link":"#底层类-unsafe","children":[]},{"level":1,"title":"本章小结","slug":"本章小结","link":"#本章小结","children":[]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"readingTime":{"minutes":9.39,"words":2818},"filePathRelative":"java/juc_notes/JUC04_CAS.md","localizedDate":"July 16, 2023","excerpt":"<p>记录 <code>CAS 与 volatile</code>，<code>原子整数</code>，<code>原子累加器</code>，<code>Unsafe</code></p>\\n","autoDesc":true}');export{e as data};
