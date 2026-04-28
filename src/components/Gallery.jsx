import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";
import { 
  Newspaper, 
  Image as ImageIcon, 
  Video, 
  FileText,
  ExternalLink,
  Calendar,
  MapPin,
  Play
} from "lucide-react";

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("news");

  const tabs = [
    { id: "news", label: "PR News", icon: <Newspaper size={30} />, color: "" },
    { id: "images", label: "Images", icon: <ImageIcon size={20} />, color: "emerald" },
    { id: "videos", label: "Videos", icon: <Video size={20} />, color: "purple" },
    { id: "articles", label: "Articles", icon: <FileText size={20} />, color: "blue" }
  ];

  const prNews = [
    {
      title: "Pink Taxi: First Blockchain-Based Women Taxi Only",
      source: "Blockonomi",
      location: "Global",
      date: "2018",
      excerpt: "Pink Taxi is revolutionizing women's transportation with blockchain technology, creating a safer ecosystem for women worldwide.",
      link: "https://blockonomi.com/pink-taxi/"
    },
    {
      title: "Pink Taxi: First Blockchain-Based Women Taxi Only",
      source: "The Bitcoin News",
      location: "International",
      date: "2018",
      excerpt: "Introducing the world's first blockchain-based taxi service exclusively for women, ensuring safety and transparency.",
      link: "https://thebitcoinnews.com/pink-taxi-first-blockchain-based-women-taxi-only/"
    },
    {
      title: "Pink Taxi: Blockchain Women Taxi Service",
      source: "Bit News Bot",
      location: "Global",
      date: "2018",
      excerpt: "Revolutionary blockchain technology meets women's safety in transportation with Pink Taxi's innovative approach.",
      link: "https://bitnewsbot.com/pink-taxi-first-blockchain-based-women-taxi-only/"
    },
    {
      title: "Pink Taxi: Primeiro Taxi Feminino Baseado em Blockchain",
      source: "BTC Soul",
      location: "Brazil",
      date: "2018",
      excerpt: "O primeiro serviço de táxi exclusivo para mulheres baseado em blockchain chega ao mercado global.",
      link: "https://www.btcsoul.com/noticias/pink-taxi-primeiro-taxi-feminino-baseado-blockchain/"
    },
    {
      title: "Pink Taxi: Safer Rides for Women by Women",
      source: "Bitcoin Warrior",
      location: "Global",
      date: "2018",
      excerpt: "Pink Taxi provides safer rides for women by women, leveraging blockchain technology for enhanced security.",
      link: "https://bitcoinwarrior.net/2018/07/pink-taxi-safer-rides-for-women-by-women/"
    },
    {
      title: "Pink Taxi: Safer Rides for Women by Women",
      source: "Coin Idol",
      location: "International",
      date: "2018",
      excerpt: "Revolutionary women-only taxi service powered by blockchain ensures safety and transparency in transportation.",
      link: "https://coinidol.com/pink-taxi-safer-rides-for-women-by-women/"
    },
    {
      title: "Initial Coin Offerings Explained - Pink Taxi Featured",
      source: "Coindoo",
      location: "Global",
      date: "2018",
      excerpt: "Learn about ICOs with Pink Taxi as a prime example of blockchain innovation in the transportation sector.",
      link: "https://coindoo.com/learn/initial-coin-offerings-explained/"
    },
    {
      title: "Pink Taxi: First Blockchain-Based Women Taxi Only",
      source: "Crypto Ninjas",
      location: "USA",
      date: "July 17, 2018",
      excerpt: "Pink Taxi launches as the first blockchain-based taxi service exclusively for women passengers and drivers.",
      link: "https://www.cryptoninjas.net/2018/07/17/pink-taxi-first-blockchain-based-women-taxi-only/"
    },
    {
      title: "Rosa Taxi: Erstes Blockchainbasiertes Frauentaxi",
      source: "Krypto Nachrichten",
      location: "Germany",
      date: "2018",
      excerpt: "Das erste blockchain-basierte Taxi-Service exklusiv für Frauen startet weltweit.",
      link: "https://krypto-nachrichten.com/rosa-taxi-erstes-blockchainbasiertes-frauentaxi/"
    }
  ];

  const images = [
    { src: "/gallery/1.webp", alt: "Pink Taxi Service 1", location: "Global Operations", caption: "Pink Taxi fleet in action" },
    { src: "/gallery/2.webp", alt: "Pink Taxi Service 2", location: "Women Empowerment", caption: "Empowering women drivers worldwide" },
    { src: "/gallery/3.webp", alt: "Pink Taxi Service 3", location: "International", caption: "Pink Taxi expansion across continents" },
    { src: "/gallery/4.webp", alt: "Pink Taxi Service 4", location: "Service Excellence", caption: "Quality service for women passengers" },
    { src: "/gallery/5.webp", alt: "Pink Taxi Service 5", location: "Global Network", caption: "Building a safer transportation network" },
    { src: "/gallery/6.webp", alt: "Pink Taxi Service 6", location: "Community Impact", caption: "Transforming communities through safety" },
    { src: "/gallery/7.webp", alt: "Pink Taxi Service 7", location: "Technology Integration", caption: "Blockchain-powered transportation" },
    { src: "/gallery/8.webp", alt: "Pink Taxi Service 8", location: "Driver Training", caption: "Professional training programs" },
    { src: "/gallery/9.webp", alt: "Pink Taxi Service 9", location: "Fleet Management", caption: "Modern fleet operations" },
    { src: "/gallery/10.webp", alt: "Pink Taxi Service 10", location: "Customer Service", caption: "Excellence in passenger care" },
    { src: "/gallery/11.webp", alt: "Pink Taxi Service 11", location: "Safety Initiatives", caption: "Prioritizing women's safety" },
    { src: "/gallery/12.webp", alt: "Pink Taxi Service 12", location: "Global Presence", caption: "Serving 18+ countries worldwide" },
    { src: "/gallery/13.webp", alt: "Pink Taxi Service 13", location: "Innovation", caption: "Leading innovation in ride-sharing" },
    { src: "/gallery/14.webp", alt: "Pink Taxi Service 14", location: "Community Building", caption: "Creating supportive communities" },
    { src: "/gallery/15.webp", alt: "Pink Taxi Service 15", location: "Success Stories", caption: "Stories of empowered women" },
    { src: "/gallery/16.webp", alt: "Pink Taxi Service 16", location: "Future Vision", caption: "Building the future of transportation" }
  ];

  const videos = [
    { id: "qSN6tkHds9E", url: "https://youtu.be/qSN6tkHds9E", title: "Pink Taxi Overview", location: "Global" },
    { id: "HSw_80Phw4U", url: "https://youtu.be/HSw_80Phw4U", title: "Women Driver Stories", location: "International" },
    { id: "6QoOReKKw6A", url: "https://youtu.be/6QoOReKKw6A", title: "Pink Taxi Launch Event", location: "Global" },
    { id: "5w2lDSiB-eU", url: "https://youtu.be/5w2lDSiB-eU", title: "Safety Features", location: "Worldwide" },
    { id: "VG0-fgRUtKg", url: "https://youtu.be/VG0-fgRUtKg", title: "Community Impact", location: "Multiple Countries" },
    { id: "l-9adsST9Cw", url: "https://youtu.be/l-9adsST9Cw", title: "Driver Training Program", location: "International" },
    { id: "ERNNs4v5Txg", url: "https://youtu.be/ERNNs4v5Txg", title: "Technology Integration", location: "Global" },
    { id: "0DEhpReR6bo", url: "https://youtu.be/0DEhpReR6bo", title: "Customer Testimonials", location: "Worldwide" },
    { id: "g7gWvRR6UTU", url: "https://youtu.be/g7gWvRR6UTU", title: "Pink Taxi Documentary", location: "International" },
    { id: "yTOIBhTvnYA", url: "https://youtu.be/yTOIBhTvnYA", title: "Empowerment Stories", location: "Global" },
    { id: "hEG3I2xnz24", url: "https://youtu.be/hEG3I2xnz24", title: "Operations Overview", location: "Multiple Cities" },
    { id: "V7oNSIKT4-s", url: "https://youtu.be/V7oNSIKT4-s", title: "Safety First Approach", location: "Worldwide" },
    { id: "hzRFU0WY76w", url: "https://youtu.be/hzRFU0WY76w", title: "Pink Taxi Growth", location: "International" },
    { id: "jLyaKGVqbso", url: "https://youtu.be/jLyaKGVqbso", title: "Women Empowerment Initiative", location: "Global" },
    { id: "kXNm_SGgW48", url: "https://youtu.be/kXNm_SGgW48", title: "Future of Transportation", location: "Worldwide" },
    { id: "CUllmxr6UHw", url: "https://youtu.be/CUllmxr6UHw", title: "Pink Taxi Success Story", location: "International" }
  ];

  const articles = [
    {
      title: "Pink taxis for women introduced in Melbourne",
      source: "The Telegraph",
      date: "2013",
      location: "Melbourne, Australia",
      excerpt: "A taxi company in Australia plans to introduce 'pink taxis' driven by women and available only to female passengers.",
      link: "https://www.telegraph.co.uk/news/worldnews/australiaandthepacific/australia/10448590/Pink-taxis-for-women-introduced-in-Melbourne.html"
    },
    {
      title: "With a green light from Karachi, Pakistan's women-only taxis eye new cities",
      source: "Reuters",
      date: "2017",
      location: "Karachi, Pakistan",
      excerpt: "Pakistan's women-only taxi service eyes expansion to new cities after successful launch in Karachi.",
      link: "https://www.reuters.com/article/us-pakistan-women-taxis/with-a-green-light-from-karachi-pakistans-women-only-taxis-eye-new-cities-idUSKBN1EI0JT"
    },
    {
      title: "Pakistan women-only pink taxis hit the streets of Karachi",
      source: "The Independent",
      date: "2017",
      location: "Karachi, Pakistan",
      excerpt: "Women-only pink taxis launched by Ambreen Sheikh provide safe transportation for women in Karachi.",
      link: "https://www.independent.co.uk/news/world/asia/pakistan-women-only-pink-taxis-hit-streets-karachi-ambreen-sheikh-a7643001.html"
    },
    {
      title: "Egypt Pink Taxi service: women's safe haven or patronising?",
      source: "The Guardian",
      date: "October 7, 2015",
      location: "Cairo, Egypt",
      excerpt: "Debate surrounds Egypt's Pink Taxi service - is it a necessary safe haven or a patronizing solution?",
      link: "https://www.theguardian.com/world/2015/oct/07/egypt-pink-taxi-service-women-safe-haven-patronising"
    },
    {
      title: "Riding Pink: Malaysia's First Women-Only Taxi Service",
      source: "Buro 24/7 Malaysia",
      date: "2017",
      location: "Malaysia",
      excerpt: "Malaysia launches its first women-only taxi service addressing safety concerns for female passengers.",
      link: "https://www.buro247.my/lifestyle/news/riding-pink-malaysia-first-women-only-taxi-service.html"
    },
    {
      title: "The pink taxi of legend",
      source: "Bangkok Post",
      date: "2014",
      location: "Bangkok, Thailand",
      excerpt: "The story of Bangkok's infamous pink taxi and its impact on the city's transportation landscape.",
      link: "https://www.bangkokpost.com/learning/easy/366028/the-pink-taxi-of-legend"
    },
    {
      title: "Taxis add a touch of pink to Dubai roads",
      source: "Gulf News",
      date: "2008",
      location: "Dubai, UAE",
      excerpt: "Dubai introduces pink women-only taxis with a fleet of 50 vehicles on the first day of operations.",
      link: "https://gulfnews.com/news/uae/transport/taxis-add-a-touch-of-pink-to-dubai-roads-1.153368"
    },
    {
      title: "Eve taxi: Kuwait women to go places on pink power",
      source: "Times of India",
      date: "2009",
      location: "Kuwait City, Kuwait",
      excerpt: "Kuwait introduces Eve Taxi following examples from Muslim and European countries for women's safety.",
      link: "https://timesofindia.indiatimes.com/world/middle-east/Eve-taxi-Kuwait-women-to-go-places-on-pink-power/articleshow/5434613.cms"
    },
    {
      title: "Pink taxis for girls only",
      source: "France 24 Observers",
      date: "March 13, 2009",
      location: "Beirut, Lebanon",
      excerpt: "Lebanon introduces pink taxis driven by women exclusively for female passengers and families.",
      link: "http://observers.france24.com/en/20090313-pink-taxis-girls-only-lebanon-banet"
    },
    {
      title: "Pink cabs rev up",
      source: "The Economist",
      date: "2010",
      location: "Mexico City, Mexico",
      excerpt: "Mexico City's progressive initiatives include introduction of pink taxis for women passengers.",
      link: "https://www.economist.com/node/16886813"
    },
    {
      title: "Pink Taxi strikes back against sexual assaults in Egypt",
      source: "Euronews",
      date: "September 9, 2015",
      location: "Cairo, Egypt",
      excerpt: "Pink Taxi takes a business approach to combat sexual harassment against women in Egypt.",
      link: "http://www.euronews.com/2015/09/09/pink-taxi-strikes-back-against-sexual-assaults-in-egypt"
    },
    {
      title: "Paxi: A New Business Empowering Women in Pakistan",
      source: "The Missing Slate",
      date: "May 29, 2017",
      location: "Pakistan",
      excerpt: "Paxi transforms public transport system in Pakistan with women-focused transportation solutions.",
      link: "http://themissingslate.com/2017/05/29/paxi-business-empowering-women-pakistan/"
    },
    {
      title: "Pink taxis to hit the streets in central Turkey",
      source: "Daily Sabah",
      date: "February 11, 2016",
      location: "Central Turkey",
      excerpt: "Central Turkey receives approval for pink taxis driven by women for families and female passengers.",
      link: "https://www.dailysabah.com/turkey/2016/02/11/pink-taxis-to-hit-the-streets-in-central-turkey"
    },
    {
      title: "Lebanon: Pink, women-only cabs give taxi service a makeover",
      source: "Christian Science Monitor",
      date: "May 6, 2009",
      location: "Beirut, Lebanon",
      excerpt: "Traditional Lebanese cab driving gets a feminine makeover with pink taxis for women passengers.",
      link: "https://www.csmonitor.com/World/Global-News/2009/0506/lebanon-pink-women-only-cabs-give-taxi-service-a-makeover"
    }
  ];

  const getTabColor = (color) => {
    const colors = {
      pink: "from-pink-500 to-pink-600",
      emerald: "from-emerald-500 to-emerald-600",
      purple: "from-purple-500 to-purple-600",
      blue: "from-blue-500 to-blue-600"
    };
    return colors[color] || colors.pink;
  };

  const YouTubeThumbnail = ({ videoId, title }) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(`https://img.youtube.com/vi/${videoId}/sddefault.jpg`);
    const [attempts, setAttempts] = useState(0);

    const handleError = () => {
      const fallbacks = [
        `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        `https://img.youtube.com/vi/${videoId}/default.jpg`,
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      ];

      if (attempts < fallbacks.length - 1) {
        setAttempts(attempts + 1);
        setThumbnailUrl(fallbacks[attempts + 1]);
      }
    };

    return (
      <img 
        src={thumbnailUrl}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover"
        onError={handleError}
      />
    );
  };

  return (
    <section id="gallery" className="relative z-10 py-24 px-6 md:px-12 scroll-mt-[85px]">
      <ParticleCanvas particleCount={60} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 
            className="font-montserrat text-4xl md:text-5xl font-bold mb-4"
            style={{ color: '#FB0A8B', letterSpacing: '-0.035em' }}
          >
            Pink Taxi Legacy Gallery
          </h2>
          <p className="font-lexend text-xl text-gray-700" style={{ fontWeight: 300 }}>
            19+ Years of Empowering Women | 10+ Countries Worldwide
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`font-montserrat flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${getTabColor(tab.color)} text-white shadow-xl`
                  : "bg-white/90 text-gray-600 hover:text-gray-800 hover:shadow-xl"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "news" && (
            <motion.div
              key="news"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {prNews.map((news, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-pink-0/00 shadow-lg hover:border-pink-400/50 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-pink-50 rounded-lg">
                      <Newspaper size={20} className="text-pink-500" />
                    </div>
                    <div className="flex-1">
                      <div className="font-lexend flex items-center gap-2 text-xs text-gray-500 mb-1" style={{ fontWeight: 300 }}>
                        <Calendar size={12} />
                        <span>{news.date}</span>
                      </div>
                      <h3 className="font-montserrat text-gray-800 font-semibold text-lg leading-tight group-hover:text-pink-500 transition-colors">
                        {news.title}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="font-lexend flex items-center gap-2 text-sm text-emerald-500 mb-3" style={{ fontWeight: 400 }}>
                    <MapPin size={14} />
                    <span>{news.location}</span>
                  </div>
                  
                  <p className="font-lexend text-gray-600 text-sm mb-4 line-clamp-3" style={{ fontWeight: 300 }}>
                    {news.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-lexend text-xs text-gray-500 italic">{news.source}</span>
                    <a 
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-montserrat flex items-center gap-1 text-pink-500 text-sm font-semibold hover:text-pink-600 transition-colors"
                    >
                      Read {news.source} Article <ExternalLink size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "images" && (
            <motion.div
              key="images"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {images.map((image, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative overflow-hidden rounded-xl bg-white/90 backdrop-blur-sm border border-emerald-300/30 shadow-lg hover:border-emerald-400/50 hover:shadow-xl transition-all"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300/10b981/ffffff?text=Pink+Taxi';
                      }}
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="font-lexend flex items-center gap-2 text-emerald-400 text-sm mb-1" style={{ fontWeight: 300 }}>
                        <MapPin size={14} />
                        <span>{image.location}</span>
                      </div>
                      <p className="font-montserrat text-white text-sm font-semibold">
                        {image.caption}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "videos" && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {videos.map((video, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative overflow-hidden rounded-xl bg-white/90 backdrop-blur-sm border border-purple-300/30 shadow-lg hover:border-purple-400/50 hover:shadow-xl transition-all"
                >
                  <div className="aspect-video overflow-hidden relative bg-gray-100">
                    <YouTubeThumbnail videoId={video.id} title={video.title} />
                    
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-purple-500 rounded-full hover:bg-purple-600 transition-colors hover:scale-110"
                      >
                        <Play size={32} className="text-white fill-current" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-montserrat text-gray-800 font-semibold mb-2 group-hover:text-purple-500 transition-colors">
                      {video.title}
                    </h3>
                    <div className="font-lexend flex items-center gap-2 text-purple-500 text-sm" style={{ fontWeight: 300 }}>
                      <MapPin size={14} />
                      <span>{video.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "articles" && (
            <motion.div
              key="articles"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {articles.map((article, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-blue-300/30 shadow-lg hover:border-blue-400/50 hover:shadow-xl transition-all group"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                      <FileText size={20} className="text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="font-lexend flex items-center gap-3 text-xs text-gray-500 mb-2" style={{ fontWeight: 300 }}>
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>{article.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={12} />
                          <span>{article.location}</span>
                        </div>
                      </div>
                      <h3 className="font-montserrat text-gray-800 font-bold text-xl mb-2 group-hover:text-blue-500 transition-colors">
                        {article.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="font-lexend text-gray-600 mb-4 leading-relaxed" style={{ fontWeight: 300 }}>
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="font-lexend text-xs text-gray-500 font-semibold">{article.source}</span>
                    <a 
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-montserrat flex items-center gap-1 text-blue-500 text-sm font-semibold hover:text-blue-600 transition-colors"
                    >
                      Read {article.source} Article <ExternalLink size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
