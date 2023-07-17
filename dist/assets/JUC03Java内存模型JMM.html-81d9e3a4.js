import{_ as l,W as t,X as p,a0 as o,Y as n,Z as s,$ as e,a1 as i,C as c}from"./framework-b5ea9e64.js";const u="/assets/image-20230713125256014-e8cb2937.png",r="/assets/image-20230713130648872-d58fee82.png",d={},k=n("p",null,[s("记录 "),n("code",null,"Java内存模型")],-1),v=i('<h1 id="java-内存模型-java-memory-model" tabindex="-1"><a class="header-anchor" href="#java-内存模型-java-memory-model" aria-hidden="true">#</a> Java 内存模型 Java Memory Model</h1><p><code>JMM</code>（<code>Java</code>内存模型<code>Java Memory Model</code>）本身是一种<strong>抽象的概念并不真实存在</strong>，它仅仅描述的是一组约定或规范，通过这组规范<strong>定义了程序中（尤其是多线程）各个变量的读写访问方式</strong>并决定<strong>一个线程对共享变量的写入以及如何变成对另一个线程可见</strong>，关键技术点都是围绕<strong>多线程的原子性、可见性和有序性</strong>展开的。JMM被提出的作用是如下：</p><ul><li>通过JMM来实现<strong>线程和主内存之间的抽象关系</strong></li><li>屏蔽<strong>各个硬件平台</strong>和操作系统的<strong>内存访问差异</strong>以实现让Java程序再各种平台下都能达到<strong>一致性</strong>的<strong>内存访问效果</strong>。</li></ul><h1 id="jmm规范的三大特性" tabindex="-1"><a class="header-anchor" href="#jmm规范的三大特性" aria-hidden="true">#</a> JMM规范的三大特性</h1><ul><li><strong>可见性</strong>：是指当一个线程<strong>修改了某一个共享变量的值</strong>，其他线程是否能够立即知道该变更，JMM规定了<strong>所有的变量都存储在主内存</strong>中。</li></ul><figure><img src="'+u+`" alt="image-20230713125256014" tabindex="0" loading="lazy"><figcaption>image-20230713125256014</figcaption></figure><ul><li><strong>原子性</strong>：指一个操作是不可被打断的，即多线程环境下，操作不能被其他线程干扰。</li><li><strong>有序性</strong>：对于一个线程的执行代码而言，我们总是习惯性地认为代码的执行总是从上到下，有序执行。<strong>但为了提升性能</strong>，<strong>编译器和处理器通常会对指令序列进行重新排序</strong>。Java规范规定JVM线程内部维持顺序化语义，即只要程序的最终结果与它顺序话执行的结果相等，那么指令的执行顺序可以与代码顺序不一致，此过程叫<strong>指令的重排序</strong>。简而言之，为了提升性能，在保证执行结果不变的情况下，指令的顺序和代码的顺序可以不一致。 <ul><li>指令的重排序的优缺点： <ul><li>JVM能根据处理器特性（CPU多级缓存系统、多核处理器等）适当的对机器指令进行重排序，使机器指令更符合CPU的执行特性，最大限度的发挥机器性能。</li><li>无法保存并行下的语义一致，会出现“脏读”现象。</li></ul></li></ul></li></ul><p>其他说法：</p><ul><li>原子性 - 保证指令不会受到线程上下文切换的影响</li><li>可见性 - 保证指令不会受 cpu 缓存的影响</li><li>有序性 - 保证指令不会受 cpu 指令并行优化的影响</li></ul><h2 id="可见性" tabindex="-1"><a class="header-anchor" href="#可见性" aria-hidden="true">#</a> 可见性</h2><p>下列例子，程序会无法跳出循环。这就是由于内存中的run被修改为false之后，缓存中的还是true。这就是<strong>主存（物理内存）与线程的工作内存（CPU缓存）之间的不可见性</strong>。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">static</span> <span class="token keyword">boolean</span> run <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token comment">// volatile static boolean run = true;  volatile 即可解决该问题</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 关于内部类使用 外部局部变量 与 静态变量</span>
    <span class="token comment">// 为了保证变量在内部与外部的一致性，方法中的局部变量需要使用final才可以内部类访问，</span>
    <span class="token comment">// 内部类访问方法的局部变量时，是将变量通过匿名内部类的构造器传入之后使用。</span>
    <span class="token comment">// 静态变量，由于是直接通过 类名.变量 调用，本身的作用域范围足够大。</span>
    <span class="token comment">// 不需要加final保证一致性。</span>

    <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token punctuation">{</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>run<span class="token punctuation">)</span><span class="token punctuation">{</span>

        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Sleeper</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    run <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>注意：如果在 while 中，存在 synchronized ，那么将不会出现上述问题。因为 synchronized 可以保证原子性与可见性。</p></blockquote><h1 id="jmm规范下多线程对变量的读写过程" tabindex="-1"><a class="header-anchor" href="#jmm规范下多线程对变量的读写过程" aria-hidden="true">#</a> JMM规范下多线程对变量的读写过程</h1><p>由于JVM运行程序的实体是线程，而每个线程创建时JVM都会为其创建一个工作内存（有的地方成为栈空间），工作内存是每个线程的私有数据区域，而Java内存模型中规定所有变量都存储在主内存，主内存是共享内存区域，所有线程都可以访问，<strong>但线程对变量的操作（读写赋值等）必须在工作内存中进行，首先要将变量从主内存拷贝到线程自己的工作内存空间，然后对变量进行操作，操作完成后再将变量写回主内存，不能直接操作主内存中的变量，<strong>各个线程中的工作内存存储着主内存中的</strong>变量副本拷贝</strong>，因此不同的线程无法访问对方的工作内存，线程间的通信（传值）必须通过主内存来完成，其简要访问过程如下图：</p><figure><img src="`+r+`" alt="image-20230713130648872" tabindex="0" loading="lazy"><figcaption>image-20230713130648872</figcaption></figure><ul><li>JMM定义了线程和主内存之间的抽象关系： <ul><li>线程之间的共享变量存储在主内存中（从硬件角度讲就是内存条）</li><li>每个线程都有一个自己的本地工作内存，本地工作内存中存储了该线程用来读写共享变量的副本（从硬件角度来说就是CPU的缓存）。</li></ul></li><li>小总结： <ul><li>我们定义的所有共享变量都储存在<strong>物理主内存</strong>中。</li><li>每个线程都有自己独立的工作内存，里面保证该线程使用到的共享变量的副本（主内存中该变量的一份拷贝）。</li><li>线程对共享变量所有的操作都必须先在线程自己的工作内存中进行后写回主内存，不能直接从主内存在读写（不能越级）。</li><li>不同线程之间也无法直接访问其他线程的工作内存中的变量，线程间变量值的传递需要通过主内存来进行（同级不能互相访问）。</li></ul></li></ul><h1 id="jmm规范下多线程先行发生原则之happens-before" tabindex="-1"><a class="header-anchor" href="#jmm规范下多线程先行发生原则之happens-before" aria-hidden="true">#</a> JMM规范下多线程先行发生原则之happens-before</h1><h1 id="volatile" tabindex="-1"><a class="header-anchor" href="#volatile" aria-hidden="true">#</a> volatile</h1><h2 id="被volatile修饰的变量有两大特点" tabindex="-1"><a class="header-anchor" href="#被volatile修饰的变量有两大特点" aria-hidden="true">#</a> 被volatile修饰的变量有两大特点</h2><p><strong>特点：</strong></p><ul><li>可见性</li><li>有序性：禁止对该指令进行从新排序</li></ul><p><strong>内存语义：</strong></p><ul><li>当写一个volatile变量时，JMM会把该线程对应的线程的工作内存中的共享变量值<strong>立即刷新回主内存</strong>中</li><li>当读一个volatile变量时，JMM会把该线程对应的<strong>线程的工作内存设置为无效</strong>，重新回到主内存中读取最新共享变量的值</li><li>所以volatile的写内存语义是直接刷新到主内存中，读的内存语义是直接从主内存中读取</li></ul><p><strong>volatile凭什么可以保证可见性和有序性？</strong></p><ul><li>内存屏障Memory Barrier</li></ul><h1 id="内存屏障memory-barrier" tabindex="-1"><a class="header-anchor" href="#内存屏障memory-barrier" aria-hidden="true">#</a> 内存屏障Memory Barrier</h1><p><strong>volatile 的底层实现原理是内存屏障，Memory Barrier（Memory Fence）</strong></p><ul><li><p><strong>对 volatile 变量的写指令后会加入写屏障</strong></p></li><li><p><strong>对 volatile 变量的读指令前会加入读屏障</strong></p></li><li><p>如何保证可见性？</p><ul><li><p>在写 volatile 变量之后，由于写屏障的作用，将新写入的值立刻写入主存当中（从修改值到写屏障发挥作用，在到写入主存这个过程是原子性的）。</p></li><li><p>在读 volatile 变量之前，由于读屏障的作用，线程不会去缓存当中读取变量的值，而是直接去主存中读取最新的值。</p></li><li><p>这样就保证了<strong>可见性</strong>。</p></li></ul></li><li><p>如何保证有序性？</p><ul><li>写屏障会确保指令重排序时，不会将写屏障之前的代码排在写屏障之后</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">actor2</span><span class="token punctuation">(</span><span class="token class-name">I_Result</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    num <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    ready <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span> <span class="token comment">// ready 是 volatile 赋值带写屏障</span>
    <span class="token comment">// 写屏障</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>读屏障会确保指令重排序时，不会将读屏障之后的代码排在读屏障之前</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">actor1</span><span class="token punctuation">(</span><span class="token class-name">I_Result</span> r<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 读屏障</span>
    <span class="token comment">// ready 是 volatile 读取值带读屏障</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>ready<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        r<span class="token punctuation">.</span>r1 <span class="token operator">=</span> num <span class="token operator">+</span> num<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        r<span class="token punctuation">.</span>r1 <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>这样就可以保证 volatile 变量相对整个程序来说，其位置是不变的。</li></ul></li></ul><h1 id="线程安全单例情况" tabindex="-1"><a class="header-anchor" href="#线程安全单例情况" aria-hidden="true">#</a> 线程安全单例情况</h1><p>例一：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 问题1：为什么加 final</span>
<span class="token comment">// 问题2：如果实现了序列化接口, 还要做什么来防止反序列化破坏单例</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>
    <span class="token comment">// 问题3：为什么设置为私有? 是否能防止反射创建新的实例?</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// 问题4：这样初始化是否能保证单例对象创建时的线程安全?</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Singleton</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 问题5：为什么提供静态方法而不是直接将 INSTANCE 设置为 public, 说出你知道的理由</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">readResolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>问题1：为什么加 final <ul><li>防止子类继承，重写方法</li></ul></li><li>问题2：如果实现了序列化接口, 还要做什么来防止反序列化破坏单例 <ul><li>添加 <code>readResolve</code> 方法，</li></ul></li><li>问题3：构造器为什么设置为私有? 是否能防止反射创建新的实例? <ul><li>防止其他人通过 new 创建对象。无法防止反射创建新的实例</li></ul></li><li>问题4：这样初始化是否能保证单例对象创建时的线程安全? <ul><li>可以，静态变量在类加载时进行创建与初始化。独此一份</li></ul></li><li>问题5：为什么提供静态方法而不是直接将 INSTANCE 设置为 public, 说出你知道的理由 <ul><li>提供方法拥有更好的封装性。</li><li>可以在方法中使用泛型</li></ul></li></ul><p>例二：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 问题1：枚举单例是如何限制实例个数的</span>
<span class="token comment">// 问题2：枚举单例在创建时是否有并发问题</span>
<span class="token comment">// 问题3：枚举单例能否被反射破坏单例</span>
<span class="token comment">// 问题4：枚举单例能否被反序列化破坏单例</span>
<span class="token comment">// 问题5：枚举单例属于懒汉式还是饿汉式</span>
<span class="token comment">// 问题6：枚举单例如果希望加入一些单例创建时的初始化逻辑该如何做</span>
<span class="token keyword">enum</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span> 
    <span class="token constant">INSTANCE</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>问题1：枚举单例是如何限制实例个数的 <ul><li>成员变量都是 <code>static</code>与<code>final</code>的。</li></ul></li><li>问题2：枚举单例在创建时是否有并发问题 <ul><li>由于是static的，所以没有线程安全问题</li></ul></li><li>问题3：枚举单例能否被反射破坏单例 <ul><li>不能，</li></ul></li><li>问题4：枚举单例能否被反序列化破坏单例 <ul><li>enum 默认就支持序列化，对反序列化可能出现的破坏单例问题做了处理。</li></ul></li><li>问题5：枚举单例属于懒汉式还是饿汉式 <ul><li>饿汉式</li></ul></li><li>问题6：枚举单例如果希望加入一些单例创建时的初始化逻辑该如何做 <ul><li>加入构造方法即可。</li></ul></li></ul><p>例三：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token comment">// 分析这里的线程安全, 并说明有什么缺点</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">synchronized</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token constant">INSTANCE</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> 
        <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>分析这里的线程安全, 并说明有什么缺点 <ul><li>锁定范围有点大，消耗过大</li></ul></li></ul><p>例四：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    
    <span class="token comment">// 问题1：解释为什么要加 volatile ?</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">volatile</span> <span class="token class-name">Singleton</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 问题2：对比实现3, 说出这样做的意义 </span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token constant">INSTANCE</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
            <span class="token keyword">return</span> <span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
            <span class="token comment">// 问题3：为什么还要在这里加为空判断, 之前不是判断过了吗</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token constant">INSTANCE</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// t2 </span>
                <span class="token keyword">return</span> <span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
            <span class="token keyword">return</span> <span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> 
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>问题1：解释为什么要加 volatile ? <ul><li>保证可见性与有序性</li><li>由于指令的重排序问题，在创建<code>INSTANCE</code>对象时，可能会存在先赋值（已经不为null），在进行初始化。会导致其他线程获取到未初始化的 <code>INSTANCE</code> 对象。从而产生错误。</li><li>添加了 volatile 创建对象的指令就会按照先初始化在赋值的顺序来办。</li></ul></li><li>问题2：对比实现3, 说出这样做的意义 <ul><li>效率更高</li></ul></li><li>问题3：为什么还要在这里加为空判断, 之前不是判断过了吗 <ul><li>在第一次创建对象时，多线程情况下可能会有多个线程绕过第一个if判断，如果不在同步快中在判断一次，会导致创建多个实例。</li></ul></li></ul><p>例五：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token comment">// 问题1：属于懒汉式还是饿汉式  懒汉式</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">LazyHolder</span> <span class="token punctuation">{</span>
        <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Singleton</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 问题2：在创建时是否有并发问题   JVM保证其安全性</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">LazyHolder</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>问题1：属于懒汉式还是饿汉式 <ul><li>懒汉式</li></ul></li><li>问题2：在创建时是否有并发问题 <ul><li>JVM保证其安全性</li></ul></li></ul><h1 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h1><p>本章重点讲解了 JMM 中的</p><ul><li><p>可见性 - 由 JVM 缓存优化引起</p></li><li><p>有序性 - 由 JVM 指令重排序优化引起</p></li><li><p>happens-before 规则</p></li><li><p>原理方面</p></li><li><ul><li>CPU 指令并行</li><li>volatile</li></ul></li><li><p>模式方面</p></li><li><ul><li>两阶段终止模式的 volatile 改进</li><li>同步模式之 balking</li></ul></li><li></li></ul><h1 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h1>`,49),m={href:"https://zhuanlan.zhihu.com/p/73561744",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.yuque.com/gongxi-wssld/csm31d/grebgmqz5d56uvcd",target:"_blank",rel:"noopener noreferrer"},g={href:"https://www.yuque.com/mo_ming/gl7b70/cpzl3l#bnM3o",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.bilibili.com/video/BV16J411h7Rd?p=157",target:"_blank",rel:"noopener noreferrer"};function w(y,f){const a=c("ExternalLinkIcon");return t(),p("div",null,[k,o(" more "),v,n("p",null,[n("a",m,[s("https://zhuanlan.zhihu.com/p/73561744"),e(a)])]),n("p",null,[n("a",b,[s("https://www.yuque.com/gongxi-wssld/csm31d/grebgmqz5d56uvcd"),e(a)])]),n("p",null,[n("a",g,[s("https://www.yuque.com/mo_ming/gl7b70/cpzl3l#bnM3o"),e(a)])]),n("p",null,[n("a",h,[s("https://www.bilibili.com/video/BV16J411h7Rd?p=157"),e(a)])])])}const S=l(d,[["render",w],["__file","JUC03Java内存模型JMM.html.vue"]]);export{S as default};
