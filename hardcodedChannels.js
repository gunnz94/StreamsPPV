const HARDCODED_TV_CHANNELS = [
    // === CHANNELS WITH POTENTIALLY ACCESSIBLE STREAMS ===
  // ACC Network
  {
    id: 'sports-acc-network',
    name: 'ACC Network',
    poster: 'https://ppv.gstream.stream/posters/ACC.jpg',
    sources: [
      { label: 'HD 1', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-5f8ee3727c75fa002d9e47c1.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=d4d3ba7f-99d1-4374-8bb8-25396540e9bc', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/accdn'},
      { label: 'HD 3', url: 'https://a1xs.vip/40000016', proxy: false },
      { label: 'HD 4', url: 'https://tvpass.org/live/ACCNetwork/hd', proxy: false },
      { label: 'SD 1', url: 'https://tvpass.org/live/ACCNetwork/sd', proxy: false }
    ]
  },
  // Ace TV
  {
    id: 'sports-AceTV', name: 'Ace TV',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2024/04/08/1712613664IxmNkW3C0m-416x260-nPMge4FS.jpeg',
    sources: [{ label: 'HD', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Sports/lang-English/ctgr-Sport/title-ACE_TV/WiseM3U8_30/sofast/cleanhls/master.m3u8', proxy: false},
    ]
  },
  // ACL Cornhole TV
  {
    id: 'sports-acl-cornhole-tv',
    name: 'ACL Cornhole TV',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fd1076185-58d6-411b-ba73-1126837074dd%2FPlex_cornhole__1500x1000_white_-_Brendan_Canning_white_rdx.png',
    sources: [
      { label: 'HD 1', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-63504925a97bd70eaef54f01.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=99017354-0189-4bc9-8763-c5d9deb48c61', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/acl-cornhole-tv-2'}
    ]
  },
  // Altitude Sports
  {
    id: 'sports-ALTS',
    name: 'Altitude Sports',
    poster: '',
    sources: [
      { label: 'HD 1', url: 'https://a1xs.vip/40000048', proxy: false },
      { label: 'HD 2', url: 'http://hardcoremedia.xyz:80/ymgiaxkw/5Hr5ZQuVfU/257039', proxy: false },
      { label: 'HD 3', url: 'https://tvpass.org/live/altitude-sports-denver/hd', proxy: false },
      { label: 'SD 1', url: 'https://tvpass.org/live/altitude-sports-denver/sd', proxy: false }
    ]
  },
  // Automotion
  {
    id: 'sports-AM', name: 'Automotion',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2024/04/08/1712609473hjETuhYlFl-416x260-VgAXiSlR.jpeg',
    sources: [{ label: 'HD', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Sports/lang-English/ctgr-Sport/title-AUTOMOTIONS/sofastplayout/0c3229e2-6ca5-4714-859e-c0ac6b9aa58a_0_HLS/manifest.m3u8', proxy: false },
     ]
  },
	// Bassmaster 
	{
		id: 'sports-bassmaster', name: "Bassmaster", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Ff6d14e42-d9be-4f81-893f-cb676d32c473%2FBassmasterChannel_DarkBackground_-_Will_Flowers.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-68caada21fabab6eb2e99331.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=6d966bab-794e-44d1-8a65-e9e7ace9f251', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/bassmaster'}]
	},
  // beIN Sports
  {
    id: 'sports-bein-sports',
    name: 'beIN Sports',
    poster: 'https://ppv.gstream.stream/posters/bein-sports-logo.png',
    description: 'beIN Sports - International sports network specializing in football, tennis, motorsports, and major sporting events.',
    sources: [
      { label: 'HD', url: '' }
    ]
  },
  // beIN Sports 2
  {
    id: 'sports-bein-sports-2',
    name: 'beIN Sports 2',
    poster: '',
    description: 'beIN Sports 2 - Secondary international sports channel with additional football and tennis coverage.',
    sources: [
      {
        label: 'HD',
        url: 'http://65.111.174.111:1935/iptv/beinsports2.stream/playlist.m3u8',
        scrapeUrl: 'https://www.beinsports.com/en-us',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.beinsports.com/'
        }
      }
    ]
  },
  // beIN Sports Turkey
  {
    id: 'sports-bein-sports-turkey',
    name: 'beIN Sports Turkey',
    poster: 'https://ppv.gstream.stream/posters/BeINTurkey.jpg',
    description: 'beIN Sports Turkey.',
    sources: [
      {
        label: 'HD',
        url: 'https://s3.dualstack.us-east-2.amazonaws.com/cam.edu//hls/480p/segment_1803.ts?token=e99mo8',
        headers: {
          'referer': 'https://epicplayplay.cfd/',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'accept-language': 'en-US,en;q=0.9',
          'accept-encoding': 'gzip, deflate, br',
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'dnt': 1
        }
      }
    ]
  },
  // beIN Sports Xtra
  {
    id: 'sports-bein-sportsxtra',
    name: 'beIN Sports Xtra',
    poster: 'https://ppv.gstream.stream/posters/bein-sports-xtra-logo.png',
    description: 'beIN Sports Xtra - International sports network specializing in football, tennis, motorsports, and major sporting events.',
    sources: [
      {
        label: 'HD 1',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-60a53634126de9002e694bc4.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=2ef682ad-188c-46ba-8c5f-02d86bff39a9',
        proxy: false
      },
      {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/bein-sports-xtra'},
      {
        label: 'HD 3',
        url: 'https://live-manifest.production-public.tubi.io/live/2fd3d156-b63c-47c8-9d04-5961ddd9cee8/playlist.m3u8',
        proxy: false
      },
      {
        label: 'HD 4',
        url: 'https://jmp2.uk/stvp-USAJ4300001Q7',
        proxy: false
      },
      {
        label: 'HD 5',
        url: 'https://bein-xtra-xumo.amagi.tv/hls/amagi_hls_data_beinAAAAA-bein-xtra-xumoA/CDN/master.m3u8?is_lat=0&us_privacy=',
        proxy: false
      }   
    ]
  },
  // beIN Sports Xtra N
  {
    id: 'sports-bein-sportsxtraN',
    name: 'beIN Sports Xtra N',
    poster: 'https://ppv.gstream.stream/posters/bein-sports-xtra-n.png',
    description: 'beIN Sports Xtra Espanol',
    sources: [
      {
        label: 'HD 1',
        url: 'https://bein-esp-klowdtv.amagi.tv/playlist.m3u8',
        proxy: false
      },
      {
        label: 'HD 2',
        url: 'https://jmp2.uk/stvp-US2700004DX',
        proxy: false
      }
    ]
  },
  // Big Ten Network
  {
    id: 'sports-big-ten-network',
    name: 'Big Ten Network',
    poster: 'https://ppv.gstream.stream/posters/Big10.jpg',
    sources: [
      {
        label: 'HD',
        url: 'https://bigten.akamaized.net/hls/live/2036005/bigten/master.m3u8',
        scrapeUrl: 'https://www.btn.com/',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.btn.com/'
        }
      },
      { label: 'A1XS HD - Dead', url: 'https://a1xs.vip/40000047', proxy: false },
      { label: 'MJ HD', url: 'https://fl7.moveonjoy.com/BIG_TEN_NETWORK/tracks-v1a1/mono.ts.m3u8', proxy: false },
      { label: 'TVPass SD', url: 'https://tvpass.org/live/BTN/sd', proxy: false },
      { label: 'A1XS SD', url: 'https://a1xs.vip/40000047', proxy: false }
    ]
  },
	// Billiard TV 
	{
		id: 'sports-billiard-tv', name: "Billiard TV", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fd413e5e7-6a1a-4539-8c84-1bf57faee1a3%2FPlex_billiard__1500x1000__color_rdxfds.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-6334a8e48a7b2a349d903b8c.m3u8?X-Plex-Session-Identifier=890ltka3bzuxws23i7lcd8rf&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=698x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=4fcbc7b6-158f-48ce-87db-1f02801622cc&X-Plex-Playback-Session-Id=96373823-67aa-4bfc-832d-ba7d6d6bc8fd', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/billiard-tv'}]
	},
  // BT Sport 1
  {
    id: 'sports-bt-sport-1',
    name: 'BT Sport 1',
    poster: 'https://ppv.gstream.stream/posters/BT%20Sport%201.jpg',
    description: 'UK sports channel featuring Premier League football, rugby union, boxing, and UFC events.',
    sources: [
      {
        label: 'HD',
        url: 'http://198.27.94.105/hls/bt1_1.m3u8',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.bt.com/sport'
        }
      }
    ]
  },
  // BT Sport 2
  {
    id: 'sports-bt-sport-2',
    name: 'BT Sport 2',
    poster: 'https://ppv.gstream.stream/posters/BT%20Sport%202.jpg',
    description: 'BT Sport 2 - Secondary UK sports channel featuring additional Premier League and rugby coverage.',
    sources: [
      {
        label: 'HD',
        url: 'http://198.27.94.105/hls/bt2_1.m3u8',
        scrapeUrl: 'https://www.bt.com/sport',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.bt.com/sport'
        }
      }
    ]
  },
  // CBS Sports Golazo Network
  {
    id: 'sports-cbs-golazo', name: "CBS Sports Golazo Network", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F22f0bb47-b71f-4d58-baf8-c8edaf4ef800%2FGolazo_colorRDX.png', description: "",
    sources: [{ label: 'HD 1', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-6571186d9a46917c0a8f2ddd.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=679da8d6-5878-4af8-81e4-19264ee34c8b', proxy: false },
    { label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/cbs-sports-golazo-network-2'},
    { label: 'HD 3', url: 'https://a1xs.vip/4000009', proxy: false }]
  },
  // CBS Sports Network
  {
    id: 'sports-CBS',
    name: 'CBS Sports Network',
    poster: 'https://ppv.gstream.stream/posters/CBSSports.jpg',
    sources: [
      { label: 'HD 1', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-657107dc56226238740fcc2d.m3u8?X-Plex-Session-Identifier=890ltka3bzuxws23i7lcd8rf&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=698x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=4fcbc7b6-158f-48ce-87db-1f02801622cc&X-Plex-Playback-Session-Id=a6ecb9ff-18f2-4360-8587-ef3f22e4d8ad', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/cbs-sports-hq-2'},
      { label: 'HD 3', url: 'https://a1xs.vip/4000008', proxy: false },
      { label: 'HD 4', url: 'https://tvpass.org/live/CBSSportsNetworkUSA/hd', proxy: false },
      { label: 'SD 1', url: 'https://tvpass.org/live/CBSSportsNetworkUSA/sd', proxy: false }
    ]
  },
  // Chicago Sports Network
  {
    id: 'sports-CHSN',
    name: 'Chicago Sports Network',
    poster: '',
    sources: [
      { label: 'AX1S HD', url: 'https://a1xs.vip/4000049', proxy: false },
      { label: 'TVPass SD', url: 'https://tvpass.org/live/chicago-sports-network/sd', proxy: false }
    ]
  },
  // Cowboy Channel
  {
    id: 'sports-COWBOY',
    name: 'Cowboy Channel',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F9e4fc329-57fb-4340-af10-67f984395d79%2FCC_FAST_WhiteLogo_1500x1000.png',
    sources: [
      { label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-680ad9f73f3c406c06d7392b.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=c2b5bc33-5e33-4679-86d7-352ca2a14750', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/cowboy-channel'}
    ]
  },
	// Cricket Gold
	{
		id: 'sports-cricket-gold', name: "Cricket Gold", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fd041b4b4-65f0-4862-8d26-a0be4c984e2e%2FCricket_Gold_Logo_1-1RDX.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-65e0c8c6d899afe817b9d224.m3u8?X-Plex-Session-Identifier=890ltka3bzuxws23i7lcd8rf&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=698x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=4fcbc7b6-158f-48ce-87db-1f02801622cc&X-Plex-Playback-Session-Id=2c7194ac-5ab5-422b-8154-5e7710c996f9', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/cricket-gold'}]
	},
  // DAZN
  {
    id: 'sports-DAZN-ringside',
    name: 'DAZN Ringside',
    poster: 'https://ppv.gstream.stream/posters/DAZN.png',
    description: 'DAZN Ringside - 24/7 Official Channel.',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-6954299e3ea890246dc21520.m3u8?X-Plex-Session-Identifier=14cpqk2ni8vcbv6px9hl9o8h&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=4fcbc7b6-158f-48ce-87db-1f02801622cc&X-Plex-Playback-Session-Id=57968fd0-7246-4a00-8247-bf6314a10ce9',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/dazn-ringside'}
    ]
  },
	// DP World Tour
	{
		id: 'sports-DPWorldTour', name: "DP World Tour", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fd6825374-e7ca-4fc3-8714-ba6752a8b286%2FDPWorldTour_1500x1000_for_dark_bgd_-_Eddie_Hunter-Higgins.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-67858517d3749c9bdd4d2ecf.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=651a2f52-fd93-4fbc-895e-c6427d29da11', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/dp-world-tour'}]
	},
  // Drive+Speed
  {
    id: 'chan-DS', name: 'Drive+Speed',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2025/07/01/1751328558AyhaPQ1LiV-416x260-EDGyK2eH.png',
    sources:[{label: 'HD', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Auto_Racing/lang-English/ctgr-Sport/title-DRIVE__SPEED/sofastplayout/2f833f43-9e48-4a6e-88a8-8d99c32eb898_0_HLS/manifest.m3u8', proxy: false}]
  },
  // ESPN
  {
    id: 'sports-ESPN',
    name: 'ESPN',
    poster: 'https://ppv.gstream.stream/posters/ESPN.jpg',
    sources: [
      { label: 'PPV HD', url: 'https://gg.poocloud.in/ESPN/tracks-v1a1/mono.ts.m3u8' },
      { label: 'A1XS HD', url: 'https://a1xs.vip/40000011', proxy: false },
      { label: 'TVPass SD', url: 'https://tvpass.org/live/ESPN/sd', proxy: false }
    ]
  },
  // ESPN+
  {
    id: 'sports-espn-plus',
    name: 'ESPN+',
    poster: 'https://ppv.gstream.stream/posters/ESPNPlus.png',
    description: 'ESPN+ - Premium streaming service featuring exclusive live sports, original documentaries, and on-demand content.',
    sources: [
      {
        label: 'HD',
        url: 'https://espnplus.akamaized.net/hls/live/2036000/espnplus/master.m3u8',
        scrapeUrl: 'https://plus.espn.com/',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.espn.com/'
        }
      }
    ]
  },
  // ESPN2
  {
    id: 'sports-ESPN2',
    name: 'ESPN2',
    poster: 'https://ppv.gstream.stream/posters/ESPN2.jpg',
    sources: [
      { label: 'A1XS HD', url: 'https://a1xs.vip/40000012', proxy: false },
      { label: 'TVPass SD', url: 'https://tvpass.org/live/ESPN2/sd', proxy: false }
    ]
  },
  // ESPN News
  {
    id: 'sports-ESPNN',
    name: 'ESPN News',
    poster: '',
    sources: [
      { label: 'A1XS HD', url: 'https://a1xs.vip/40000014', proxy: false },
      { label: 'TVPass SD', url: 'https://tvpass.org/live/ESPNews/sd', proxy: false }
    ]
  },
  // ESPNU
  {
    id: 'sports-ESPNU',
    name: 'ESPNU',
    poster: '',
    sources: [
      { label: 'A1XS HD', url: 'https://a1xs.vip/40000013', proxy: false },
      { label: 'TVPass SD', url: 'https://tvpass.org/live/ESPNU/sd', proxy: false }
    ]
  },
  // Eurosport 1
  {
    id: 'sports-eurosport-1',
    name: 'Eurosport 1',
    poster: 'https://ppv.gstream.stream/posters/Eurosport1.png',
    description: 'European sports network featuring live coverage of tennis, cycling, motorsports, winter sports, and more.',
    sources: [
      {
        label: 'HD',
        url: 'http://213.250.19.50/eurosport/eurosport.isml/eurosport-video=2500000-audio101=128000.m3u8',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.eurosport.com/'
        }
      }
    ]
  },
  // Eurosport 2
  {
    id: 'sports-eurosport-2',
    name: 'Eurosport 2',
    poster: 'https://ppv.gstream.stream/posters/Eurosport2.png',
    sources: [
      {
        label: 'HD',
        url: 'http://213.250.19.50/eurosport2/eurosport2.isml/eurosport2-video=2500000-audio101=128000.m3u8',
        scrapeUrl: 'https://www.eurosport.com/player',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.eurosport.com/'
        }
      }
    ]
  },
  // Equus TV
  {
    id: 'chan-EQUUS', name: 'Equus TV',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2024/02/09/1707440878KxBQASrLNy-416x260-UZubIuj9.jpeg',
    sources:[{label: 'HD', url: 'https://d2gwqf8gdwq1zs.cloudfront.net/v1/master/9d062541f2ff39b5c0f48b743c6411d25f62fc25/STIRR-MuxIP-EQUUSTV/426.m3u8', proxy: false}]
  },
  // Extreme Sports
  {
    id: 'chan-XS', name: 'Extreme Sports',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2022/10/10/1665417153z12fFv2AJQ-416x260-QL1Qv0mt.png',
    sources:[{label: 'HD', url: 'https://d3p1dbb9xrkmd5.cloudfront.net/v1/master/9d062541f2ff39b5c0f48b743c6411d25f62fc25/NuestraTV-MuxIP-ExtremePlus/276.m3u8', proxy: false}]
  },
	// FanDuel TV Extra
	{
		id: 'sports-fanduel-tv-extra', name: "FanDuel TV Extra", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F2102b336-c77e-4f12-a447-a451f326beca%2FFDTV_EXTRA_AttributionWhite_RDX.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-64e9f17c7511e20e999d6c34.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=f0f6a617-3205-4476-8678-3dd03eba9709', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/fanduel-tv-extra-2'}]
	},
  // FIFA+
  {
    id: 'sports-fifaplus',
    name: 'FIFA +',
    poster: 'https://ppv.gstream.stream/posters/FIFAplus.jpg',
    description: 'Formula 1 TV - Dedicated F1 coverage including live races, qualifying, practice sessions, and analysis.',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-66628d4a8dfc36b8c8a399c4/variant.m3u8?x-plex-token=g-vm2as7fPzGpaurodjJ&x-plex-advertising-identifier=&x-plex-client-identifier=j1ifx6tof7i6sk93mk7xcxdo&x-plex-playback-id=p_9e799dcd-94b1-4e3d-8bb1-51309f6713ff&x-plex-playback-session-id=78124a42-472b-4bc0-88aa-3abefe912599&x-plex-session-id=eadcc9de-0f74-428e-8205-f7f858d8d511&x-plex-device=Windows&x-plex-device-name=Chrome&x-plex-advertising-donottrack=1&x-plex-drm=&x-plex-model=standalone&x-plex-platform=Chrome&x-plex-platform-version=143.0&x-plex-product=Plex+Web&x-plex-device-screen-resolution=1920x945%2C1920x1080&x-plex-device-vendor=&x-plex-version=4.157.0&x-plex-provider-streaming-start=1768506491&url=80889bd133e74f7c3ce403db506165d3-aa2b91521f53d207cc50ee40ef5f822c885f1dba9e4d75504ef8556af722d25b81145f9026d07a7b54b16157ea7654baf49ff5b67e1af891d7f054e3a42055e29d291a0defb8aa5386d535161ac573bed182d70f867f8c409a5a34e2ec6f8410a65369ed62e2cc69b572ee65f65fd0520aa0ece32ffba0ff9f4edcb118139e64b200b8aa05ea61f6781b46be5c426eca27903c20b5b08605d81b311f1eb140f4',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/fifa-4'}
    ]
  },
  // Fight Channel
  {
    id: 'chan-FC', name: 'Fight Channel',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2022/09/05/1662383251k3xfq6RI1U-416x260-QdPPBYUX.jpeg',
    sources:[{label: 'HD', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Auto_Racing/lang-English/ctgr-Sport/title-DRIVE__SPEED/sofastplayout/2f833f43-9e48-4a6e-88a8-8d99c32eb898_0_HLS/manifest.m3u8', proxy: false}]
  },
  // Fight Network
  {
    id: 'sports-fight-network',
    name: 'Fight Network',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Ff%2Fepg%2Fchannels%2Flogos%2Fgracenote%2Ff6e88714b4dae6026720d36ad9de611f.png',
    description: '',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-606605549dbfca002d2ae877.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x1080%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=867caf75-bc73-4255-8c1d-92707c7b0dc9',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/fight-network'}
    ]
  },
  // Fight TV
  {
    id: 'chan-FTV', name: 'Fight TV',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2025/07/01/1751329122xyk8AVge6b-416x260-EksiPjIi.png',
    sources:[{label: 'HD', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Sports/lang-English/ctgr-Sport/title-FIGHT-TV-ENG/sofastplayout/2c1b92e0-9ef4-41b1-9713-ba53b562e94c_0_HLS/manifest.m3u8', proxy: false}]
  },
  // Fite 24/7
  {
    id: 'chan-FITE', name: 'Fite 24/7',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2022/08/25/1661452611f3ZQYyky7j-416x260-ZS7e2cPd.jpg',
    sources:[{label: 'HD', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Sports/lang-English/ctgr-Sport/title-FITE_24_7/sofastplayout/263.m3u8', proxy: false}]
  },
  // Foosball TV
  {
    id: 'chan-FSTV', name: 'Foosball TV',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2025/07/01/1751329613MhmhWLFwR6-416x260-p0OuTeVt.png',
    sources:[{label: 'HD', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Sports/lang-English/ctgr-Sport/title-ITSF-ENG/sofastplayout/99a6543a-9d90-4412-8576-398aebc882fb_0_HLS/manifest.m3u8', proxy: false}]
  },
  // Formula 1 TV
  {
    id: 'sports-f1-tv',
    name: 'Formula 1 TV',
    poster: 'https://ppv.gstream.stream/posters/F1.jpg',
    description: 'Formula 1 TV - Dedicated F1 coverage including live races, qualifying, practice sessions, and analysis.',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-6896595a58a6658b3d6a501a.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=ccb6cf06-b6ed-4c96-8c43-14c67c73a8a6',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/f1-channel'}
    ]
  },
  // Fox Soccer Plus
  {
    id: 'sports-fox-soccer-plus',
    name: 'Fox Soccer Plus',
    poster: '',
    sources: [
      {
        label: 'HD',
        url: 'https://foxsoccer.akamaized.net/hls/live/2036001/foxsoccer/master.m3u8',
        scrapeUrl: 'https://www.foxsports.com/soccer',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.foxsports.com/'
        }
      }
    ]
  },
  // Fox Sport 501
  {
    id: 'sports-fox-sport-501',
    name: 'Fox Sport 501',
    poster: '',
    description: 'Fox Sports 501 AU channel.',
    sources: [
      { label: 'HD', url: 'https://a1xs.vip/700001', proxy: false }
    ]
  },
  // Fox Sport 502
  {
    id: 'sports-fox-sport-502',
    name: 'Fox Sport 502',
    poster: '',
    description: 'Fox Sports 502 AU channel.',
    sources: [
      { label: 'HD', url: 'https://a1xs.vip/700002', proxy: false }
    ]
  },
  // Fox Sports 1
  {
    id: 'sports-fox-sportsa',
    name: 'Fox Sports 1',
    poster: '',
    description: 'Fox Sports 1 - Major US sports network covering NFL, MLB, NBA, NHL, college sports, and auto racing.',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-659f04ef27ae392d2e204695.m3u8?X-Plex-Session-Identifier=escnfn1bsq84suqqc9rwz4e1&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=4oqwunpj0ndyb3bumhrdpan1&X-Plex-Platform=Microsoft%20Edge&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Microsoft%20Edge&X-Plex-Device-Screen-Resolution=1829x1468%2C2560x1600&X-Plex-Token=8MrbxWkqzfME9gRunUgr&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=f75c488c-7d33-487b-8b30-aa63a7dc941e&X-Plex-Playback-Session-Id=955a86ab-52cf-442f-82dc-be64ec286e83',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/fox-sports'}
    ]
  },
  // Fox Sports 2
  {
    id: 'sports-fox-sportsb',
    name: 'Fox Sports 2',
    poster: '',
    description: 'Fox Sports 2 - Secondary Fox Sports channel offering additional live sports and alternative event coverage.',
    sources: [
      {
        label: 'HD',
        url: 'http://78.129.179.33:1935/edge/53/playlist.m3u8?token&bid=12&pid=5&uid=250668&did=4f7b236fb7362bb13b91a099ba65374e&g=1&gm=1&platform=3',
        scrapeUrl: 'https://www.foxsports.com/live',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.foxsports.com/'
        }
      }
    ]
  },
  // FTF Sports
  {
    id: 'sports-ftf-sports',
    name: 'For The Fans Sports',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Faa1c5515-a30f-4790-a384-ca23a3ba0740%2FFTFSportsWHT.png',
    description: '',
    sources: [
      {
        label: 'HD 1',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-605a309dc5acdc002c7a20aa.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=a5e4b9f8-2d30-471f-8b12-980b5ce71d6e',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/for-the-fans'}
    ]
  },
	// Fubo Sports Network 
	{
		id: 'sports-fubo-sports-network', name: "Fubo Sports Network", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fa%2Fepg%2Fchannels%2Flogos%2Fgracenote%2Fac0e90e4853f26cfbcfd401790e7ab28.png', description: "",
		sources: [{label: 'HD 1', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-5fc705f68aba71002d8b7b37.m3u8?X-Plex-Session-Identifier=n1zsf9ohi2irfzysqg5zfd5x&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=4fcbc7b6-158f-48ce-87db-1f02801622cc&X-Plex-Playback-Session-Id=32008f51-911a-4282-899c-07ea2a0faa69', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/fubo-sports-network'}]
	},
  // Fuel TV
  {
    id: 'sports-fuel-tv',
    name: 'Fuel TV',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2F6%2Fepg%2Fchannels%2Flogos%2Fgracenote%2F6d37acb509ed72b6cc59cdb32828cbc0.png',
    description: 'Fuel TV',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-62d15f16001c04178f555e40.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=1a660f47-c552-4709-82bf-3d52dba0d191',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/fuel-tv-4'}
    ]
  },
  // Game & Fish TV
  {
    id: 'sports-game-and-fish-tv',
    name: 'Game & Fish TV',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F76978d32-d638-4ef6-a167-a4b87a600f70%2FGame-Fish-TV_logo_allwhite_-_Daniel_Soane.png',
    description: 'Game & Fish TV',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-67a147a7114554261db9e45d.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=7345e94b-a93c-4ff3-89d8-b28f566582e3',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/game-and-fish-tv'}
    ]
  },
	// Glory TV
	{
		id: 'sports-glory-tv', name: "Glory TV", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F24dfa4e0-5cba-4f17-afce-f325404ba01a%2FGLORY_Logo_Light_Nicholas_Olsen.png', description: "",
		sources: [{label: 'HD 1', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-63f914bffe2c3d32e1a7929f.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=4fcbc7b6-158f-48ce-87db-1f02801622cc&X-Plex-Playback-Session-Id=9324d8be-84b2-434c-8522-d6f852018036', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/glory-kickboxing'}]
	},
  // Goal TV
  {
    id: 'chan-GTV', name: 'Goal TV',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2025/07/01/1751330357iXZkoSrM4n-416x260-HqNW8IE7.png',
    sources:[{label: 'HD', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Sports/lang-English/ctgr-Sport/title-Goal_TV/sofastplayout/WiseM3U8_1/master.m3u8', proxy: false}]
  },
  // Golf Pass
  {
    id: 'sports-golf-pass',
    name: 'Golf Pass',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F8639a81b-d79c-4a70-8034-26edfb0e13bc%2Fgolfpass-fclogo-72-dpi-1500-x-1000-3-2-channel-logo-dark-plex-1.png',
    description: 'Golf Pass - Comprehensive golf coverage including PGA Tour, LPGA, European Tour, and instructional programming.',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-5fc706038aba71002d8b7c8e.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=7de24170-c484-4821-8bba-aebfcc04cf73',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/golfpass'}
    ]
  },
  // Grappling Network
  {
    id: 'chan-GRAP', name: 'Grappling Network',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2024/02/09/1707442456xf6tRG4fFT-416x260-NHj3thH0.png',
    sources:[{label: 'HD', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Sports/lang-English/ctgr-Sport/title-TheGrapplingNetwork-ENG/sofastplayout/236.m3u8', proxy: false}]
  },
	// Hard Knocks
	{
		id: 'sports-hard-knocks', name: "Hard Knocks", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fimages%2Fott_channels%2Flogos%2Fhardknocks_logo_dark.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-5fd115bdb7ef8d002dcf1820.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=fd0cfa01-6ca6-4333-84a1-1dcca9692326', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/hard-knocks'}]
	},
  // HBCUGO
  {
    id: 'sports-hbcugo',
    name: "HBCUGO Sports",
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fe%2Fepg%2Fchannels%2Flogos%2Fgracenote%2Fef631804cdf478bca5ba96eaee4bc241.png',
    description: '',
    sources: [{ label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-631a212e82b744e0309aa56e.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=89a67057-2093-4113-89cf-0b71e8893fb0', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/hbcugo-sports'}]
  },
  // Homerun TV
  {
    id: 'chan-HRTV', name: 'Homerun TV',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2025/07/01/1751330819RCU5vxqXYC-original-ChcGUiTp.png',
    sources:[{label: 'HD', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Sports/lang-English/ctgr-Sport/title-HOMERUN_TV/WiseM3U8_29/sofast/cleanhls/master.m3u8', proxy: false}]
  },
  // Hoop TV
  {
    id: 'chan-HOOP', name: 'Hoop TV',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2025/07/01/1751331303opJn647Bhy-416x260-y6kX3egV.png',
    sources:[{label: 'HD', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Sports/lang-English/ctgr-Sport/title-Hoop_TV/WiseM3U8_28/sofast/cleanhls/master.m3u8', proxy: false}]
  },
  // Horizon Sports
  {
    id: 'chan-HS', name: 'Horizon Sports',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2025/07/01/17513357175MrIgSh6q9-416x260-jrxy1CdQ.png',
    sources:[{label: 'HD', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Sports/lang-English/ctgr-Sport/title-horizonsports/sofastplayout/restream/horizonsports/master.m3u8', proxy: false}]
  },
  // Horse TV
  {
    id: 'chan-HTV', name: 'Horse TV',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2025/07/01/1751331729ulHpeRczFM-416x260-037RbAdf.png',
    sources:[{label: 'HD', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Sports/lang-English/ctgr-Sport/title-Horse_TV/vglive-sk-469239/index.m3u8', proxy: false}]
  },
  // In Trouble
  {
    id: 'chan-IT', name: 'In Trouble',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2025/05/20/1747705458IXtqjENYGU-416x260-TF6DFmxw.png',
    sources:[{label: 'HD', url: 'https://amg00861-amg00861c6-stirr-us-8229.playouts.now.amagi.tv/playlist.m3u8', proxy: false}]
  },
  // Inter 24/7
  {
    id: 'sports-inter-247',
    name: "Inter 24/7",
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F57fe10fd-e61b-4796-9afa-1cb853548709%2Fchannel_logo_dark.png_-_Ingrid_Barresi.png',
    description: 'Inter 24/7 - 24/7 coverage of the Intercontinental Cup.',
    sources: [{ label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-69011e71d320237a5a2d9f63.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=be6dd5ee-b145-47bc-894b-b12aae6158af', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/inter-24-7'}]
  },
  // K-BaseBall TV
  {
    id: 'sports-k-baseball-tv',
    name: "K-BaseBall TV",
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F023b2ee3-edc6-4096-a15d-7455ac06203d%2FK-Baseball_TV_logo_dark_-_Jason_Hwang.png',
    description: '',
    sources: [{ label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-682dff1fdfc9c452b8f9842a.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=940fb342-4e8b-46e3-8ac1-72e7364d5d55', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/k-baseball-tv'}]
  },
  // Live Cricket
  {
    id: 'chan-LC', name: 'Live Cricket',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2024/02/09/17074404126L5Wr4c9E7-416x260-1murb9UO.jpeg',
    sources:[{label: 'HD', url: 'https://d382r3rgbxdixq.cloudfront.net/v1/master/9d062541f2ff39b5c0f48b743c6411d25f62fc25/STIRR-MuxIP-CricketGold/418.m3u8', proxy: false}]
  },
  // MLB Network
  {
    id: 'sports-mlb-network',
    name: 'MLB Network',
    poster: '',
    description: 'MLB Network - 24/7 baseball coverage including live games, MLB Tonight, and original programming.',
    sources: [
      {
        label: 'HD',
        url: 'https://mlb-network.akamaized.net/hls/live/2035992/mlbnetwork/master.m3u8',
        scrapeUrl: 'https://www.mlb.com/network',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.mlb.com/'
        }
      }
    ]
  },
  // MMA TV
  {
    id: 'chan-MMA', name: 'MMA TV',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2025/06/30/1751326202WBJHDDSd4D-416x260-325fBBzz.png',
    sources:[{label: 'HD', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Sports/lang-English/ctgr-Sport/title-MMA/vglive-sk-462904/playlist.m3u8', proxy: false}]
  },
	// Monster Jam
	{
		id: 'sports-monster-jam', name: "Monster Jam", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F23824964-562b-4498-9eaa-d6262cb7e0c3%2FMonster_Jam_Logo_on_Transparent_1500x1000_Casey_Murawski.png', description: "",
		sources: [{label: 'HD 1', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-6615885e1eabecf2c9d56495.m3u8?X-Plex-Session-Identifier=jlfwtqetf1msowfu8dlew878&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=698x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=4fcbc7b6-158f-48ce-87db-1f02801622cc&X-Plex-Playback-Session-Id=c6635cae-6251-4fce-86d1-cbc2ad4e45b6', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/monster-jam'}]
	},
  // MotoGP
  {
    id: 'sports-motogp',
    name: 'MotoGP Channel',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fd5b19340-b4d9-498d-8f89-2a69bc30fc4b%2FMotoGPChannel_1500x1000_logo_for_dark_bgd_-_Eddie_Hunter-Higgins.png',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-68b0b0d0f2989364c9c17265.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=5464650c-45f6-434f-8f7e-2aca4ae57207',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/motogp-channel'}
    ]
  },
  // Motors TV
  {
    id: 'sports-motors-tv',
    name: 'Motors TV',
    poster: '',
    sources: [
      {
        label: 'HD',
        url: 'https://motors-tv.akamaized.net/hls/live/2036000/motorstv/master.m3u8',
        scrapeUrl: 'https://www.motors.tv/',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.motors.tv/'
        }
      }
    ]
  },
  // Motorvision TV
  {
    id: 'sports-motorvision-tv',
    name: 'Motorvision TV',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fimages%2Fott_channels%2Flogos%2Fmotorvision_logo_dark_v2.png',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-603fb593a99efc002dbf90e4.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=8b8137e1-3735-4dc5-870f-77fd19c0c476',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/motorvision-tv'}
    ]
  },
	// MSG SportsZone
	{
		id: 'sports-msg-sportszone', name: "MSG SportsZone", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2F6%2Fepg%2Fchannels%2Flogos%2Fgracenote%2F6786da65a6db13732b7b580755932165.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-63b5df3f27159bc9de3062aa.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=eb51d9ff-26a6-4d88-8dcf-ff401c4fbb98', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/msg-sportszone'}]
	},
  // Nautical Channel
  {
    id: 'chan-NC', name: 'Nautical Channel',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2024/04/08/17126107611l3ZAg8tJ1-416x260-9fScjK2R.jpeg',
    sources:[{label: 'HD', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Sports/lang-English/ctgr-Sport/title-Nautical_TV/vglive-sk-231198/index.m3u8', proxy: false}]
  },
  // NBA TV
  {
    id: 'sports-nba-tv',
    name: 'NBA TV',
    poster: '',
    description: 'NBA TV - 24/7 basketball network featuring live games, analysis, and original NBA programming.',
    sources: [
      {
        label: 'HD',
        url: 'https://nba-tv.akamaized.net/hls/live/2035990/nbatv/master.m3u8',
        scrapeUrl: 'https://www.nba.com/tv',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.nba.com/'
        }
      }
    ]
  },
  // NBC Sports
  {
    id: 'sports-nbc-sports',
    name: 'NBC Sports',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fc%2Fepg%2Fchannels%2Flogos%2Fgracenote%2Fccdbca6785ac89ad9cb6b6626b891a33.png',
    description: 'NBC Sports - Premier US sports network featuring NFL Sunday Night Football, Premier League, and Olympic sports coverage.',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-5fc70600598c41002da3dd43/variant.m3u8?x-plex-token=g-vm2as7fPzGpaurodjJ&x-plex-advertising-identifier=&x-plex-client-identifier=j1ifx6tof7i6sk93mk7xcxdo&x-plex-playback-id=p_220d1f6b-98ed-4359-9428-7669ebb4bbf7&x-plex-playback-session-id=73c37bbf-aa6c-47da-88e6-b93a6060f2d8&x-plex-session-id=eadcc9de-0f74-428e-8205-f7f858d8d511&x-plex-device=Windows&x-plex-device-name=Chrome&x-plex-advertising-donottrack=1&x-plex-drm=&x-plex-model=standalone&x-plex-platform=Chrome&x-plex-platform-version=143.0&x-plex-product=Plex+Web&x-plex-device-screen-resolution=1920x945%2C1920x1080&x-plex-device-vendor=&x-plex-version=4.157.0&x-plex-provider-streaming-start=1768504191&url=29cece374f0faaa456305bc82a2c3b15-26d2f1747c9fbb8a3e5fa48c33c9477e4f8357581dea807cdc7fc2811269b1d1c5ad7d3a4bfac236b84e26ff997ad52e07a2dcfc2d22b43bea89dca499f4a5378db3a9d67f3f35a71d7f581a2be9c496c89244bf0bf48ee74ba444cc951703c8cce9753c7c909dbc1b2071ec09309423bc9d6835deea1ff53d5de6d178632492e257fca1f9537e4f680800ba17f7eebbe245f5c945baf906bb1c8fbb379e5f95',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/nbc-sports-now'}
    ]
  },
	// NESN Nation
	{
		id: 'sports-nesn-nation', name: "NESN Nation", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2F9%2Fepg%2Fchannels%2Flogos%2Fgracenote%2F99bf05dfe25874877cf2251a760f76c2.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-6759a32270e41582b1b7a236.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=8442e421-40a3-4223-84e3-7afa61510cb4', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/nesn-nation'}]
	},
// NFL Channel
{
  id: 'sports-nfl-channel',
  name: "NFL Channel",
  poster: 'https://ppv.gstream.stream/posters/nfl-channel.png',
  description: "NFL Channel - Official NFL channel featuring games, analysis, and programming",
  sources: [
    {label: 'HD 1', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-61e805952502a7a6fa84d70f.m3u8?X-Plex-Session-Identifier=lno0zpag8u84p1dh2h98jyrt&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=92dd94ea-58e5-4e05-882d-0cd9f16463d7', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/nfl-channel'}
  ]
},
	// NHRA TV
	{
		id: 'sports-nhra-tv', name: "NHRA TV", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fimages%2Fott_channels%2Flogos%2FNHRA_logo_dark.png', description: "NHRA TV - Official NHRA channel featuring races, analysis, and programming",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-60aeb5cd87f9b1002ce12323.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=c74613ff-ba09-4136-83f2-5c8d38c4e47c', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/nhra-tv'}]
	},
  // Nitro TV
  {
    id: 'chan-NTV', name: 'Nitro TV',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2024/04/08/1712611356BpC0G7E9wA-416x260-zNVVdCN6.jpeg',
    sources:[{label: 'HD', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Sports/lang-English/ctgr-Sport/title-NITRO-TV-ENG/sofastplayout/71960d71-216f-47f3-bfe5-5b1386c05760_0_HLS/manifest.m3u8', proxy: false}]
  },
// ONE Championship TV
{
  id: 'sports-one-championship-tv',
  name: "ONE Championship TV",
  poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fa3b45d90-8290-4886-8017-d55ed6517f6c%2FONE_1500x1000_for_dark_bgd_-_Eddie_Hunter-HigginsRDX.png',
  description: "ONE Championship TV - Official ONE Championship channel featuring fights, analysis, and programming",
  sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-6785867ad3749c9bdd4d2ed1.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=bce6daf5-f491-45f0-83f9-551257e9b082', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/one-championship-tv'}]
},
// OutsideTV
{
  id: 'sports-outside-tv',
  name: "OutsideTV",
  poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fe0d4f5b6-5127-441d-8b30-f547cc0b4ed5%2FOutside_Logo_light_1500x1000.png',
  description: "OutsideTV - Official OutsideTV channel.",
  sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-629e522ed1bc5f1b16c6b98d.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=72e76ac4-70de-4170-8ca6-082ea91b00d4', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/outside'}]
},
// Overtime
{
  id: 'sports-overtime',
  name: "Overtime",
  poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F9601711e-66df-4bdb-ae7a-611b8673b90a%2FLight_Logo_LGrdx.png',
  description: "Overtime - Official Overtime channel.",
  sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-62a388865440744efae8e243.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=ebdad800-f8a6-4b37-8e3a-8a0af461c4f7', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/overtime'}]
},
  // PAC-12 Network
  {
    id: 'sports-pac12-network',
    name: 'PAC-12 Network',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fa3c09b3c-9f7e-40e9-b14e-5174a45ad551%2FP12_Insider_blue_-_Sean_Kent.png',
    description: 'PAC-12 Network - Dedicated to West Coast college sports covering football, basketball, and Olympic sports.',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-646c0dfbfb58444e4e1e262d.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=f029c5df-2a4c-4ad5-85f8-f6546a4016d5',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/pac-12-insider'}
    ]
  },
	// PFL MMA
	{
		id: 'sports-pfl-mma', name: "PFL MMA", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F96dd0531-b500-4bd4-93ca-763cbf46defe%2F1500x1000_PFL_SHIELD_DARK_BG_-_Allie_Dinsmore.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-643f0ecd76de2b4015ae6c01.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=aed3cf7c-df6a-47b3-89c2-9d7832ddb744', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/pfl-mma'}]
	},
	// PGA Tour
	{
		id: 'sports-pga-tour', name: "PGA Tour", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Feed7be0b-c44c-4afa-bfa4-66b9536ace9a%2FPGA_TOUR_PrimaryLogo_Color_RGB_Reverse_654_-_Lily_MorrisonRDX.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-68017ed20268b77d02a5f4bd.m3u8?X-Plex-Session-Identifier=890ltka3bzuxws23i7lcd8rf&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=698x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=4fcbc7b6-158f-48ce-87db-1f02801622cc&X-Plex-Playback-Session-Id=172e01ef-9643-4c06-87aa-b314f9548611', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/pga-tour'}]
	},
	// PickleTV
	{
		id: 'sports-pickletv', name: "PickleTV", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F6b1c4bff-1077-4ba0-a8d6-f4c39365f126%2FPickleTV_1500x1000_3_ChannelLogoLight_Casey_Murawskirdx.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-63ec0b739866d8d2120ac759.m3u8?X-Plex-Session-Identifier=890ltka3bzuxws23i7lcd8rf&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=698x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=4fcbc7b6-158f-48ce-87db-1f02801622cc&X-Plex-Playback-Session-Id=879ec362-3a3d-4af7-8cd6-68fe3147074c', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/pickletv'}]
	},
	// PickleballTV
	{
		id: 'sports-pickleballtv', name: "PickleballTV", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F5c3ddbf2-e5f5-4764-92eb-8276e6a54e38%2Fpbtv_1_1500_x_1000___Logo_Dark_BG_1__-_Ari_Brock.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-6583507e0938f2993a23375c.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=28cb53e7-5599-4b82-8554-50f83285ab67', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/pickleballtv'}]
	},
  // PLL Network
  {
    id: 'sports-pll-network',
    name: 'PLL Network',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F3db52a85-5e90-49f6-8d8e-170d71c86b33%2FPLLL_WHITE_TEXT_1500x1000_DarkBG.png',
    description: 'Extreme sports, action sports, and adventure programming featuring Red Bull athletes and events worldwide.',
    sources: [{ label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-66fbfd67bde73c589ab2af42.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=9992661e-f832-40d8-89c5-de9a4abeb82b', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/pll-network-2'}]
  },
	// Poker Night TV
	{
		id: 'sports-poker-night-tv', name: "Poker Night TV", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fe081c886-d798-4438-855b-2f1fb10c50ee%2Fpoker-night-tv.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-60afc726623f2f002c5bb49f.m3u8?X-Plex-Session-Identifier=890ltka3bzuxws23i7lcd8rf&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=698x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=4fcbc7b6-158f-48ce-87db-1f02801622cc&X-Plex-Playback-Session-Id=49a37029-1206-4c8e-8463-8f6100c5fa91', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/poker-night-tv'}]
	},
	// PokerGO
	{
		id: 'sports-pokergo', name: "PokerGO", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fa2ff31a8-9b9a-4b7b-9aa5-71c0bc166632%2F1500x1000_LightBG_-_Aidan_Perrizo_white.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-64ac687b4192b4e1bab96279.m3u8?X-Plex-Session-Identifier=890ltka3bzuxws23i7lcd8rf&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=698x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=4fcbc7b6-158f-48ce-87db-1f02801622cc&X-Plex-Playback-Session-Id=5bb407c5-3c56-48a6-8466-d2e9eb8ec3f9', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/poker-go'}]
	},
  // PursuitUp
  {
    id: 'sports-pursuitup',
    name: 'PursuitUp',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fb6b9b8c8-e821-4f5c-b617-2f2d87dc8d72%2FLight_Logo_-_Austen_Faulk.png',
    description: '',
    sources: [{ label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-63628eb88e4b18ca22f897dc.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=966e6156-de55-4a2c-8245-34c3dab10be9', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/pursuitup'}]
  },
  // Racer Select
  {
    id: 'sports-racer-select',
    name: 'Racer Select',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F5b78a1ca-2f4e-401b-8a7a-3e912ccceb0b%2FRACER_Select_logo_1500x1000.png',
    description: 'Racer Select - NASCAR and IndyCar racing coverage.',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-5f0641d0e8ffda004033aff4.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=0790f147-28af-48d0-8665-b777e5071696',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/racer-select'}
    ]
  },

  // Red Bull TV
  {
    id: 'sports-red-bull-tv',
    name: 'Red Bull TV',
    poster: 'https://ppv.gstream.stream/posters/Redbull.png',
    description: 'Extreme sports, action sports, and adventure programming featuring Red Bull athletes and events worldwide.',
    sources: [
      { label: 'HD 1', url: 'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8', proxy: false },
      { label: 'HD 2', url: 'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_6660.m3u8', proxy: false },
      { label: 'HD 3', url: 'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_3360.m3u8', proxy: false },
      { label: 'HD - NZ', url: 'https://i.mjh.nz/.r/redbull-tv.m3u8', proxy: false },
      { label: 'SD', url: 'http://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master_1660.m3u8', proxy: false }
    ]
  },
  // Racing America
  {
    id: 'sports-racing-america',
    name: 'Racing America',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F58d6bf78-1acf-4d3e-8e82-fdf0f7b5137a%2FPlex_Logo_Light_1500x1000_-_Jillian_Schwartz.png',
    description: 'Racing America',
    sources: [
      { label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-61a945156547ba4d6d238dc9.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=e55bc391-effd-4264-870f-da7129203f9d', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/racing-america'}
    ]
  },
  // ROME
  {
    id: 'sports-rome',
    name: 'ROME',
    poster: 'https://ppv.gstream.stream/posters/ROME.jpeg',
    description: 'The Jim Rome Show',
    sources: [
      { label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-66b2a9acc0ebb601ab4b1e73.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=218627cb-0c3f-4c73-89ac-932a5890497e', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/the-jim-rome-show'}
    ]
  },
  // SEC Network
  {
    id: 'sports-sec-network',
    name: 'SEC Network',
    poster: '',
    sources: [
      {
        label: 'HD',
        url: 'https://sec-network.akamaized.net/hls/live/2036004/secnetwork/master.m3u8',
        scrapeUrl: 'https://www.secsports.com/',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.secsports.com/'
        }
      },
      { label: 'A1XS HD', url: 'https://a1xs.vip/40000015', proxy: false },
      { label: 'MJE HD', url: 'http://23.237.104.106:8080/USA_SEC_NETWORK/tracks-v1a1/mono.m3u8', proxy: false },
      { label: 'TVPass SD', url: 'https://tvpass.org/live/SECN/sd', proxy: false }
    ]
  },
  // Skate Surf Snow
  {
    id: 'chan-SSS', name: 'Skate Surf Snow',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2024/07/03/172002506794upvjlKT5-416x260-R4YX0pWw.png',
    sources:[{label: 'HD', url: 'https://amg01074-fueltv-amg01074c1-stirr-us-4214.playouts.now.amagi.tv/playlist_eng.m3u8', proxy: false}]
  },
  {
  id: 'sports-sky-premier-league-iptv',
  name: 'Sky Premier League',
  poster: 'https://example.com/poster.jpg',
  sources: []
},
  // Sky Sports 1
  {
    id: 'sports-sky-sports-1',
    name: 'Sky Sports 1',
    poster: '',
    description: 'Sky Sports 1 - Main UK sports channel featuring Premier League football, F1 racing, and golf coverage.',
    sources: [
      {
        label: 'HD',
        url: 'http://198.27.94.105/hls/skysports1_1.m3u8',
        scrapeUrl: 'https://www.skysports.com/watch/sky-sports',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.skysports.com/'
        }
      }
    ]
  },
  // Sky Sports 2
  {
    id: 'sports-sky-sports-2',
    name: 'Sky Sports 2',
    poster: '',
    sources: [
      {
        label: 'HD',
        url: 'http://198.27.94.105/hls/skysports2_1.m3u8',
        scrapeUrl: 'https://www.skysports.com/watch/sky-sports-2',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.skysports.com/'
        }
      }
    ]
  },
  // Sky Sports Main Event
  {
    id: 'sports-sky-sports-main',
    name: 'Sky Sports Main Event',
    poster: '',
    description: 'Sky Sports Main Event - Premium UK channel featuring the biggest live sports events of the day.',
    sources: [
      {
        label: 'HD',
        url: 'https://skysports1-live.akamaized.net/hls/live/2035984/skysports1/master.m3u8',
        scrapeUrl: 'https://www.skysports.com/watch/sky-sports-main-event',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.skysports.com/'
        }
      }
    ]
  },
  // Sky Sports Moto GP
  {
    id: 'sports-sky-sports-moto-gp',
    name: 'Sky Sports Moto GP',
    poster: 'https://ppv.gstream.stream/posters/sky-sports-moto-gp.png',
    description: 'Sky Sports Moto GP - Dedicated 24/7 Moto GP coverage and analysis.',
    sources: [
      {
        label: 'HD - Italiano',
        url: 'https://qmaalhy7acgxwhm.ngolpdkyoctjcddxshli469r.org/sunshine/nbPtlLuLotSIXqWfSzd7a7T949UrO-5J6qOgLPKJcBhVLI1m5Xv31qRE6w6Vq_hb2DpGdYPSvsFQmnHKKAYQwDS1fcZz2gBNTJQQTFi6qbcNUNuRneUqztvXN5W0nfY-jO7YhevWL-Uti9rH-P0o5qJHVwolVF6Hd_Tg1AE2AWo1GeJOPXvoyuEwXZdTsiMLTEIxIUScKzRjdqvSyvKBndvM5EcfRyADwbO-k6fHCdCRMzKjL5sFJMlTc71xg8Zv/hls/index.m3u8',
        proxy: false
      }
    ]
  },
  // Sky Sports News
  {
    id: 'sports-sky-sports-news',
    name: 'Sky Sports News',
    poster: '',
    description: '24/7 sports news channel providing the latest updates, scores, and analysis from the world of sports.',
    sources: [
      {
        label: 'HD',
        url: 'http://198.27.94.105/hls/skysportsnews_1.m3u8',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.skysports.com/'
        }
      }
    ]
  },
  // Sky Sports Premier League
  {
    id: 'sports-sky-sports-premier',
    name: 'Sky Sports Premier League',
    poster: 'https://ppv.gstream.stream/posters/sky-sports-premier.png',
    description: 'Sky Sports Premier League - Dedicated 24/7 Premier League football coverage and analysis.',
    sources: [
      {
    label: 'HD',
    url: 'http://2.magmas5.com:8000/streaming/clients_live.php?username=XXXR3str3amLine&password=200conxxxxQ41&stream=218101&extension=ts',
    proxy: false,
    headers: {
      'User-Agent': 'IPTVSmartersPro/1.1.1 Chrome/53.0.2785.143 Electron/1.4.16 Safari/537.36'
    }
  }
    ]
  },
  // Sky Sports Tennis
  {
    id: 'sports-sky-sports-tennis',
    name: 'Sky Sports Tennis',
    poster: 'https://ppv.gstream.stream/posters/sky-sports-tennis.png',
    description: 'Sky Sports Tennis',
    sources: [
      {
        label: 'HD',
        url: 'https://www.streamfree.to/live/skysportstennis1080p/index.m3u8',
        proxy: true,
        headers: {
          'referer': 'https://www.streamfree.to/embed/tennis/skysportstennis?server=origin&quality=1080p',
          'accept-language': 'en-US,en;q=0.9',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          'accept-encoding': 'gzip, deflate, br',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'dnt': '1',
          'accept': '*/*'
        }
      },
      {
        label: 'HD',
        url: 'https://www.streamfree.to/live/skysportstennis1080p/index.m3u8',
        proxy: true,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.streamfree.to/'
        }
      },
      {
        label: 'HD',
        url: 'https://www.streamfree.to/live/skysportstennis1080p/index.m3u8',
        proxy: true,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.streamfree.to/'
        }
      },
      {
        label: 'HD',
        url: 'https://www.streamfree.to/live/skysportstennis1080p/index.m3u8',
        proxy: true,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.streamfree.to/'
        }
      }
    ]
  },
  // Slopes TV
  {
    id: 'sports-slopes-tv',
    name: "Slopes TV",
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fa8716411-7f01-4f8b-bde3-e8390a6d14ce%2FSLOPES_logo_dark.png',
    description: 'Slopes TV',
    sources: [{ label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-616df1be2cf008a748c8cb53.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=e8007c8e-1155-4473-8c30-bd41d279579e', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/slopes'}]
  },
  // Speed Sport 1
  {
    id: 'chan-SS1', name: 'Speed Sport 1',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2024/07/31/1722458403rVipSpep8n-416x260-BZDxNYWC.png',
    sources:[{label: 'HD', url: 'https://linear-599.frequency.stream/dist/stirr/599/hls/master/playlist.m3u8', proxy: false}]
  },
  // Sports First
  {
    id: 'chan-SF', name: 'Sports First',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2024/02/09/1707446902rOUCzuiQg4-416x260-hsFUoITA.png',
    sources:[{label: 'HD', url: 'https://d4ddgdmj1cvnm.cloudfront.net/v1/master/9d062541f2ff39b5c0f48b743c6411d25f62fc25/STIRR-MuxIP-SportsFirstTV/409.m3u8', proxy: false}]
  },
	// Sports Illustrated TV
	{
		id: 'sports-sports-illustrated-tv', name: "Sports Illustrated TV", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F61e78adf-40b3-4a6f-9d75-6c9db47248de%2FSITV_LOGO_PRIMARY_1500X1000.png', description: "",
		sources: [{label: 'HD 1', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-6216ae22c3bbca2de8704f65.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=2c29678b-7608-4567-85f2-e783a52f90c0', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/sports-illustrated-tv'}]
	},
	// SportsGrid
	{
		id: 'sports-sportsgrid', name: "SportsGrid", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fed88a8cc-a1f4-445a-a2bc-9fbb4c7104de%2FSG-LIVE-WHITE-ON-ALPHA-1500x1000.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-5ef11485d33ab9004048a1ca.m3u8?X-Plex-Session-Identifier=890ltka3bzuxws23i7lcd8rf&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=698x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=4fcbc7b6-158f-48ce-87db-1f02801622cc&X-Plex-Playback-Session-Id=45e3a628-6a68-47cb-8504-c27d7c5121b0', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/sportsgrid'}]
	},
	// Stadium
	{
		id: 'sports-stadium', name: "Stadium", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F5264e0e3-9dea-4613-9ba5-29198c40cdee%2Fstadium_dark_background_-_Janet_Feng.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-5f6142d2fc6ce20041ec3c92.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=da000161-3e56-43d1-856e-e1259fc542bf', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/stadium'}]
	},
	// Strongman Champions
	{
		id: 'sports-strongman-champions', name: "Strongman Champions", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F80fb7204-c306-4759-a0d7-c4e829650c22%2FStrongmanChampionsLeague_Channel-Logo-Light-1500px.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-644b13a3a1c0a5b2024c8403.m3u8?X-Plex-Session-Identifier=890ltka3bzuxws23i7lcd8rf&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=698x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=4fcbc7b6-158f-48ce-87db-1f02801622cc&X-Plex-Playback-Session-Id=504875f7-6451-4f82-869d-9ddc88b77c25', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/strongman-champions'}]
	},
	// Surf Cinema
	{
		id: 'sports-surf-cinema', name: "Surf Cinema", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fa244db09-7052-4237-ab42-58bcb2b56fe1%2FSurfCinemaStacked-DarkBackground-1500x1000y.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-656fbbd6dbcce28c3a41741b.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=d2ffbb9b-6ab8-4aa4-8647-cd18c991adc7', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/surf-cinema'}]
	},
  // Surf Now TV
  {
    id: 'sports-surf-now-tv',
    name: "Surf Now TV",
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Ff477c6bf-6e85-45d0-bd00-cf1f31e4906a%2F1091_surfnowtv_1.png',
    description: 'Surf Now TV',
    sources: [{ label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-6227c215c9f485cc7afe8c41.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=9460f0a5-58e0-4896-89f0-ba0217623c65', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/surf-now-tv'}]
  },
  // Swerve Combat
  {
    id: 'sports-swerve-combat',
    name: "Swerve Combat",
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Faa449194-1789-42d6-8a03-55ef1e991c40%2FPLEX_1500x1000_Logo_Dark.png',
    description: 'Swerve Combat - 24/7 combat sports coverage featuring the biggest live combat sports events of the day.',
    sources: [{ label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-61f04d2bb01a6e8df3f72902.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=0339fea7-bfbe-418e-898f-73ed2af294b9', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/swerve-combat'}]
  },
  // Tennis+
  {
    id: 'sports-tennis-plus',
    name: 'Tennis+',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F704e7af1-90a0-4ad4-94de-af2559c19fa6%2F1_Tennis_Plus_Logo__Dark_Mode__1500x1000px.png',
    description: 'Tennis+ - Official Channel',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-6761f91555e174e95ccc4e4c.m3u8?X-Plex-Session-Identifier=890ltka3bzuxws23i7lcd8rf&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=698x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=4fcbc7b6-158f-48ce-87db-1f02801622cc&X-Plex-Playback-Session-Id=e6ccb348-58ff-4f12-8c4e-ff6e3ca4fc4e',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/tennis'}
    ]
  },
	// Tennis Channel 2
	{
		id: 'sports-tennis-channelb', name: "Tennis Channel 2", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fa4713cf8-8897-41c2-bab4-132f733d3f5f%2FTC2_Logo_Plex_1500X1000_LightRDX.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-65944d40cbc51b25e5070a18.m3u8?X-Plex-Session-Identifier=890ltka3bzuxws23i7lcd8rf&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=698x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=4fcbc7b6-158f-48ce-87db-1f02801622cc&X-Plex-Playback-Session-Id=96050c04-877b-4c50-8c14-aeb183412659', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/tennis-channel-2'}]
	},
  // TNA Channel
  {
    id: 'sports-tna-channel',
    name: "TNA Wrestling Channel",
    poster: 'https://ppv.gstream.stream/posters/TNA.jpg',
    description: '',
    sources: [{ label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-606605549dbfca002d2ae873/variant.m3u8?x-plex-token=g-vm2as7fPzGpaurodjJ&x-plex-advertising-identifier=&x-plex-client-identifier=j1ifx6tof7i6sk93mk7xcxdo&x-plex-playback-id=p_b1bd9c87-2559-47ac-a250-5d78013fb2e1&x-plex-playback-session-id=bb003ea7-5d50-4d0c-8057-1873b9c431bb&x-plex-session-id=eadcc9de-0f74-428e-8205-f7f858d8d511&x-plex-device=Windows&x-plex-device-name=Chrome&x-plex-advertising-donottrack=1&x-plex-drm=&x-plex-model=standalone&x-plex-platform=Chrome&x-plex-platform-version=143.0&x-plex-product=Plex+Web&x-plex-device-screen-resolution=1920x945%2C1920x1080&x-plex-device-vendor=&x-plex-version=4.157.0&x-plex-provider-streaming-start=1768505684&url=90c850779f7cf4816b6750f7d8cb6cd8-bace18e21601af0e8c230f54cf690387e33b4a08e8611f8bbd566e035d996d8394f20011673ed34d2ad234a4a9c2e64793101658a9ce761bebcf94f86fb7d672bf0b7a3086b78c7837c8938929304985a1730f1a8f14ee437f53aefdfc6c72a9aa6ccf92302b364899c1c2553da3422aab12b5c451fce5300a3ac0fa047450d21ad96500b22cd70633a7104223fd4e3498fe743a13c9026bc6f66697481cc2e7290cb5974e81332ab8a773a266d6f243668bf6dd263cb4d8598dceb98d109662', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/tna-wrestling-channel'}]
  },
  // TRACE Sport Stars
  {
    id: 'sports-TSS', name: 'TRACE Sport Stars',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2024/08/06/1722921577SuDgpp1pUP-416x260-0VvcDdVB.jpeg',
    sources:[{ label: 'HD 1', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Sports/lang-English/ctgr-Sport/title-TRACE_SPORTSTAR/sofastplayout/5e2b9435-5e47-7a63-9d15-14cf8712ec14_0_HLS/manifest.m3u8', proxy: false },
      {label: 'HD 2', url: 'https://amg01131-tracetv-amg01131c2-stirr-us-4392.playouts.now.amagi.tv/playlist.m3u8', proxy: false}
    ]
  },
  // TRITON Poker
  {
    id: 'sports-triton-poker',
    name: "Triton Poker",
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F3083db91-a573-4a57-aa4b-5313378c4b7f%2FTriton_1500x1000_white_-_Eddie_Hunter-Higgins.png',
    description: 'Poker Galore',
    sources: [{ label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-678fe95d389daa346544d501.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=e0128b64-b03f-4047-8559-ab9a3d55ef05', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/triton-poker'}]
  },
  // TSN
  {
    id: 'sports-tsn',
    name: 'TSN',
    poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpUTvFAR1U3Hozf42F84kquiJYTJ1j113vYQ&s',
    description: 'The Sports Network - Canada\'s leading sports broadcaster covering NHL, CFL, NBA, MLB, and more.',
    sources: [
      {
        label: 'HD - TSN1',
        url: 'https://fl1.moveonjoy.com/TSN_1/mpegts',
        proxy: false
       },
      {
        label: 'HD - TSN2',
        url: 'https://fl1.moveonjoy.com/TSN_2/mpegts',
        proxy: false
       },
      {
        label: 'HD - TSN3',
        url: 'https://fl1.moveonjoy.com/TSN_3/mpegts',
        proxy: false
       },
      {
        label: 'HD - TSN4',
        url: 'https://fl1.moveonjoy.com/TSN_4/mpegts',
        proxy: false
       },
      {
        label: 'HD - TSN5',
        url: 'https://waypointt-waypointtv-lg-us-uh6qo.amagi.tv/ts-us-w2-n2/playlist/waypointt-waypointtv-lg-us/cb57381b657a639098cb3f78d2f04882967b3dcb0e6c886470af4a9765d97800dbe8ae84ae5b910c4c9e1fc061017d360439cd1dd56c49c1da63b820743c4b21fdcde00080dd0d0cb1df11292ca36265299a7369cc350f7bd2ec5a2f803ebe764c53cb017c593f88f258a9754cc59e0a957f39e8fc8b307b24455a9c5a43e6a64ed6abb64244dc6fbfb102488b2f57f3d4139ad51ab2828246c840877eec159cc4f096821683858c35fc5fe6370b01752fc1d420c9bd37dbdb9e7a77987e26490a46e3af9f8c2d56e717192f9299cabb76b11adefb4ceb0767f550d61fca60d082cb63c1e04ab3e3aede305e53b9e9547b2eace9a1c5ae7b63fd2eccabe7d97c6b8ab63a4c07983d96727078a7f4c542d098558ee077ccf4480d28cc94729e9f998afbffd819cb6b9991b4d0166a7a4e284ec651ab91689b0ed87ba3c15a617f4556a297508bd78d0d7e3201d6ce0e94201abfda998a905b689d2e480ca845dd5c4a3d9867222cab7db7ca661ce34f0b812673f8572590438edb4694f781966c50b4dad40cfc60fabb1ec0ef70cd075e6c31e98d463444486e9eef761d3e78ce4096a3a08f7b0e03e4f6c3f0c55f2b382e125056ce8889719f9d8e2d1800c85023746d0012e477bc18ef055b1321c71fdfec2a7b88163439e3b56533300b97cca2cf8bd7de36d615b29fa76f45575867ae7d012378dab58850f94a0d143e0ad95f3212e8570e0febc491b4d4d46bcc9f29f36f67122ec7a116425e0a243053cdc26be56688ea7546100a3db68daa3007eb09ad08049bd49c47f1e386c34002e2db3d7b42a2a3eb41ee4fbd71f13e9add60ddca354c7c6e04206aef259ee1dbb6701802ba5586e76423114d6443a9def37344e8814f7c1f065b13705c4c8b6dd2c7f86b1a72e0b026a908a8bb15e1755d3d3b48c9914070b2a8264cd265252092a9c5ddf99143089c3abd35e87013aa523a2be3e731fecce7a0adc93c0240919d8378968dc4c1c0dfc1233e2c693390ce161554d034ff8102aefc492fa1d9c5b5943ed746e333ba96bf61b16ff785ef58eeb599f9b426430d1407b291b9aa66aed66072b275df423a0bdcdbb48602d5eefc5628a40d9aca6d0783377d4fc6b8f402dc59d1cb3029f5887a56d36048afc5fb21198869e7173b73f5c2967d79a8e70a80468f9ae7052fdd504e0426e4ba66d79c832717b97c38a57fab613c741a6422ff/180/1280x720_3329040/index.m3u8',
        proxy: false
       }
    ]
  },
  // UFC Fight Pass
  {
    id: 'sports-ufc',
    name: 'UFC',
    poster: 'https://ppv.gstream.stream/posters/UFC.png',
    description: 'UFC - Premier MMA network featuring live UFC events, fight archives, and original programming.',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-66ccac69fdf9cd3a568ef135/variant.m3u8?x-plex-token=g-vm2as7fPzGpaurodjJ&x-plex-advertising-identifier=&x-plex-client-identifier=j1ifx6tof7i6sk93mk7xcxdo&x-plex-playback-id=p_d61724a9-4b1e-4f6e-8d61-14160675d270&x-plex-playback-session-id=33be1fb3-a983-4828-8207-0fa68e2cbc57&x-plex-session-id=eadcc9de-0f74-428e-8205-f7f858d8d511&x-plex-device=Windows&x-plex-device-name=Chrome&x-plex-advertising-donottrack=1&x-plex-drm=&x-plex-model=standalone&x-plex-platform=Chrome&x-plex-platform-version=143.0&x-plex-product=Plex+Web&x-plex-device-screen-resolution=1130x945%2C1920x1080&x-plex-device-vendor=&x-plex-version=4.157.0&x-plex-provider-streaming-start=1768423095&url=5c04c75a746343cee687e4d38e65fa83-1b6cd92c7944bf9a6cc19bdf435116c0d7920a1f9c7a197ad3746954c5e537794d121a313e6cf19422c88deeb8f59af3123a80d4426fb098eadfcd2e811771ce143add217c3cbbebb51c11ecb909ed51f4ab20aae4789ba3154888e0b38705b0249bc538296da3fcbd21abdd18e25a9198c89a8cd91e692a339adf07d2236d185ed5aad63b744392079085c29c8eaf794ea05d93a470d8d8796e1e6337ef577846ce4852ce112abbad2bb177e0cdd861dcdb3ef396a52682bd507b52540ebb85ad1f58f8b3edc32c6bee3e1dc22bc299',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/ufc'}
    ]
  },
  // Unbeaten
  {
    id: 'sports-unbeaten',
    name: 'Unbeaten',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fe98b8325-c421-44e7-81c8-0b6a2c4f7505%2FUnbeaten_logo_dark_-_Sam_Neazi.png',
    description: 'Unbeaten - Sports Channel',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-633239caa6615514fb78ecf3.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=f0e00527-0599-4333-831a-80fa0adc6d4f',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/unbeaten'}
    ]
  },
// Victory+
{
  id: 'sports-victory-plus',
  name: "Victory+",
  poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fe2e7dd5e-7be9-41c5-9a3a-55b1af668062%2FVictory_plus_WHT.png',
  description: "Victory+ - Official Channel",
  sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-695d6e5fe625040869eaebec.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=785a2578-25c3-48e1-8007-cd6415b130de', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/victory-2'}]
},
  // Waypoint TV
  {
    id: 'sports-waypoint-tv',
    name: "Waypoint TV",
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fimages%2Fott_channels%2Flogos%2Fwaypointtv_logo_dark.png',
    description: 'Fishing, Hunting, Adventures and more.',
    sources: [{ label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-5fd115b8b7ef8d002dcf1817.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=f0adb7d2-8f4c-4283-8fa4-959377dfa7f1', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/waypoint-tv'}]
  },
	// Wired2Fish
	{
		id: 'sports-wired2fish', name: "Wired2Fish", poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F146827c9-ba03-4f25-86b2-d99c501e8227%2Fwired2fish_white.png', description: "",
		sources: [{label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-608a2c722957c9002c6a617b.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=2cbaca55-333b-4f43-8891-02b4918d171f', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/wired2fish'}]
	},
  // Willow Sports
  {
    id: 'sports-willow-sports', name: 'Willow Sports',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Facf3d1d8-c53e-49ca-86e9-0d9410b106b4%2FWillow_Sports_dark_Background_1500_1000_color.png',
    sources: [
    { label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-66fbf9cf128ab3f65b259bcb.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=e084d5ec-bc7b-41a9-8106-8ccc6f4eb8bd', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/willow-sports'}]
  },
  // Womens Sports Network
  {
    id: 'sports-womens-sports-network',
    name: 'WSN',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F5c5587dd-f93b-42db-b0dc-6b7a78801c3d%2FWSNLogoColor_1500x1000.png',
    description: 'Womens Sports Network',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-630fa9e577ec3866def38fa2.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=ffc60220-65d6-4ed3-8fde-6e63e2c9ddc8',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/womens-sports-network'}
    ]
  },
  // World Billiards TV
  {
    id: 'sports-world-billiards-tv', name: 'World Billiards TV',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F55d069fe-0219-447a-a712-e3ecaed26241%2F_Plex__WBT_Logo_Dark_Mode.png',
    sources: [
    { label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-68b9f334fc12601028c5651e.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=5b7cc236-426a-4ef2-8aff-d62429ec341d', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/world-billiards-tv'}
    ]
  },
  // World Poker Tour
  {
    id: 'chan-WPT', name: 'World Poker Tour',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fb9255584-5d8d-4ccf-bd10-e7cf61170bb7%2Fwpt_logo_ATTRIBUTION__1_.png',
    sources:[{label: 'HD 1', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-66ad6b4fcb5d3b7fb5011c2f.m3u8?X-Plex-Session-Identifier=4g189bws10ykqkkptq2p65af&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1920x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=4fcbc7b6-158f-48ce-87db-1f02801622cc&X-Plex-Playback-Session-Id=fbfcf746-4ef6-4054-8017-10ed97a1620e', proxy: false },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/world-poker-tour'}]
  },
  // World Surf League
  {
    id: 'sports-world-surf-league',
    name: 'World Surf League 24/7',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2Fb4cf623f-e45e-4706-ba5c-fdf92a9e1e44%2FWSL_WHITE_LOGO.png',
    description: 'World Surf League - 24/7 professional surfing programming including live events, original series, and classic content.',
    sources: [
      {
        label: 'HD',
        url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-652875586425fdb1f32d2169.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=50330599-3584-4a8b-823b-47ab80d5db5b',
        proxy: false
      },
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/world-surf-league-24-7'}
    ]
  },
  // Yachting
  {
    id: 'chan-YACHT', name: 'Yachting',
    poster: 'https://vcz-ktest2-cloud-vodlix-com.b-cdn.net/u/ktest2/files/thumbs/2025/07/01/1751336099mWZp1KWVT7-416x260-163GV1N6.jpeg',
    sources:[{label: 'HD', url: 'https://streams2.sofast.tv/ptnr-stirr/genre-Lifestyle/lang-English/ctgr-Entertainment/title-Yachting_TV/sofastplayout/5e2b9435-5e47-7a63-9d15-14cf8712ec14_0_HLS/manifest.m3u8', proxy: false}]
  },
  // Yahoo! Sports Network
  {
    id: 'sports-yahoo-sports-network',
    name: 'Yahoo! Sports Network',
    poster: 'https://images.plex.tv/photo?size=small-60&scale=1&url=https%3A%2F%2Fprovider-static.plex.tv%2Fepg%2Fcms%2Fproduction%2F1c2d21da-e88d-4886-b221-69213fad8260%2FYSN_1500x1000_logo_for_light_bgd_-_WHITETEXTs.png',
    description: 'Yahoo! Sports Network Official Channel',
    sources: [
      { label: 'HD', url: 'https://epg.provider.plex.tv/library/parts/5e20b730f2f8d5003d739db7-68b0af6097cf9742e13391a5.m3u8?X-Plex-Session-Identifier=hyz7ddqbryoi7hmskgsk3331&X-Plex-Product=Plex%20Web&X-Plex-Version=4.157.0&X-Plex-Client-Identifier=j1ifx6tof7i6sk93mk7xcxdo&X-Plex-Platform=Chrome&X-Plex-Platform-Version=143.0&X-Plex-Features=external-media%2Cindirect-media%2Chub-style-list&X-Plex-Model=standalone&X-Plex-Device=Windows&X-Plex-Device-Name=Chrome&X-Plex-Device-Screen-Resolution=1130x945%2C1920x1080&X-Plex-Token=g-vm2as7fPzGpaurodjJ&X-Plex-Language=en&Accept-Language=en&X-Plex-Session-Id=eadcc9de-0f74-428e-8205-f7f858d8d511&X-Plex-Playback-Session-Id=8e90e2a9-301a-45c0-8a16-6a415a994aec', proxy: false},
    {label: 'HD 2 - Slow Load', url: 'https://addon3.gstream.stream/plex/m3u8/yahoo-sports-network'}
    ]
  }
];

module.exports = {
    HARDCODED_TV_CHANNELS
};
