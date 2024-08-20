


const critics = [
  {
    name: "Robert Parker",
    img: "https://images.squarespace-cdn.com/content/v1/54ad18f1e4b00f7c5fca6afa/1516025539166-V9E4T968DO8S5HZYJVWC/robert+parker.jpeg",
    bio: "Robert Parker is one of the most influential wine critics in the world. He is the founder of 'The Wine Advocate' and is known for his 100-point wine rating scale, which has shaped the wine industry for decades. Parker's reviews have had significant impact on wine pricing and consumer preferences, particularly in the Bordeaux region.",
    awards: [
      "Order of Merit of the French Republic",
      "James Beard Foundation Award",
    ],
    experience: 40,
  },
  {
    name: "Jancis Robinson",
    img: "https://assets.cdn.bbcmaestro.com/5e39fc7530411cae1d0792cc433f7742.jpg",
    bio: "Jancis Robinson is a British wine critic, journalist, and one of the most respected voices in the wine world. She is the author of several authoritative books on wine, including 'The Oxford Companion to Wine.' Robinson is also known for her work on the 'Financial Times' and her influential online platform, JancisRobinson.com.",
    awards: [
      "Officer of the Order of the British Empire",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 45,
  },
  {
    name: "James Suckling",
    img: "https://www.masterclass.com/course-images/attachments/H3xHf9A3bB9ycwXkvztt9CKw",
    bio: "James Suckling is a prominent American wine critic who spent nearly three decades at 'Wine Spectator' before founding his own wine media company. Suckling is known for his extensive tasting notes and scores, especially for wines from Italy, Bordeaux, and California. His annual list of the Top 100 Wines is highly anticipated by wine enthusiasts.",
    awards: ["Wine Spectator Critics Award", "Decanter Power List"],
    experience: 35,
  },
  {
    name: "Tim Atkin",
    img: "https://blog.winesofargentina.com/wp-content/uploads/2017/04/Tim-Atkin.jpg",
    bio: "Tim Atkin is a British Master of Wine and a well-known wine journalist. He contributes to several major publications and has his own website where he publishes detailed reports on wine regions such as South Africa, Argentina, and Burgundy. Atkin is known for his deep understanding of the wine industry and his engaging writing style.",
    awards: [
      "British Wine Writer Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 30,
  },
  {
    name: "Neal Martin",
    img: "https://i2.wp.com/vino-joy.com/wp-content/uploads/2020/01/Neal-martin.jpg?fit=2048%2C1152",
    bio: "Neal Martin is an esteemed wine critic, formerly of 'The Wine Advocate' and now a senior editor at Vinous. He is particularly known for his expertise in Bordeaux wines, and his tasting notes are highly regarded by collectors and enthusiasts alike. Martin's writing is characterized by its wit and thoroughness.",
    awards: [
      "Roederer International Wine Writers’ Award",
      "Wine Writer of the Year",
    ],
    experience: 25,
  },
  {
    name: "Antonio Galloni",
    img: "https://blogs-images.forbes.com/karlaalindahao/files/2017/09/Antonio-Galloni-Vinous_Best-Wines-for-Fall.jpg",
    bio: "Antonio Galloni is a renowned wine critic and the founder of Vinous, a leading online wine publication. He began his career reviewing Italian wines before expanding to cover regions like Bordeaux, California, and Champagne. Galloni's comprehensive reports and accessible style have made him a trusted voice in the wine industry.",
    awards: ["Wine Advocate Critics Award", "Best Wine Critic - Vinous"],
    experience: 20,
  },
  {
    name: "Stephen Tanzer",
    img: "https://assets.tastingbook.com/assets/full/57de8bdb7d5b0a8379ccb0003fa67800.jpg",
    bio: "Stephen Tanzer is a veteran wine critic and the former editor of 'International Wine Cellar,' a publication he founded in 1985. Tanzer is known for his rigorous tasting standards and has a particular affinity for wines from Burgundy, Bordeaux, and the Pacific Northwest. He now contributes to Vinous alongside Antonio Galloni.",
    awards: ["James Beard Foundation Award", "Wine Spectator Critics Award"],
    experience: 35,
  },
  {
    name: "Lisa Perrotti-Brown",
    img: "https://cbwc.org/wp-content/uploads/2024/06/Lisa-Perrotti-Brown.png",
    bio: "Lisa Perrotti-Brown is a Master of Wine and was the editor-in-chief of 'The Wine Advocate.' She is a respected wine critic with expertise in regions such as Napa Valley and Bordeaux. Perrotti-Brown has a deep understanding of both the technical and sensory aspects of wine, which is reflected in her detailed tasting notes.",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 20,
  },
  {
    name: "Allen Meadows",
    img: "https://assets.tastingbook.com/assets/full/8a8ea9c944d149c152c14beb4f7c475d.jpg",
    bio: "Allen Meadows, also known as 'Burghound,' is a wine critic who specializes in Burgundy. His publication, 'Burghound,' is considered the authoritative guide for Burgundy enthusiasts. Meadows is known for his comprehensive knowledge of the region and his meticulous tasting methodology, making him a trusted resource for collectors.",
    awards: [
      "International Wine Challenge Judge",
      "Wine Spectator Critics Award",
    ],
    experience: 25,
  },
  {
    name: "Steven Spurrier",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/49/Steven_Spurrier_-_Stierch.jpg",
    bio: "Steven Spurrier was a British wine expert, merchant, and critic who gained fame for organizing the 1976 Judgment of Paris, a blind tasting that put California wines on the global map. Spurrier was also a prolific writer and educator, contributing to several wine publications and books throughout his career.",
    awards: ["Decanter Power List", "Wine Spectator Critics Award"],
    experience: 45,
  },
  {
    name: "Eric Asimov",
    img: "https://cdn10.bostonmagazine.com/wp-content/uploads/2016/02/Eric-Asimov.jpg",
    bio: "Eric Asimov is the chief wine critic for 'The New York Times,' where he has written extensively about wine, food, and culture. Known for his approachable style, Asimov's columns have made wine more accessible to a broad audience. He is also the author of 'How to Love Wine: A Memoir and Manifesto.'",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 25,
  },
  {
    name: "Karen MacNeil",
    img: "https://www.karenmacneil.com/wp-content/uploads/2021/08/img_authority.jpg",
    bio: "Karen MacNeil is a highly respected wine educator, writer, and author of 'The Wine Bible,' a comprehensive guide to wine that has become an essential resource for wine lovers. MacNeil's expertise spans many regions and styles, and she is known for her ability to demystify wine for both novices and connoisseurs.",
    awards: ["James Beard Foundation Award", "Wine Enthusiast Wine Star Award"],
    experience: 30,
  },
  {
    name: "Oz Clarke",
    img: "https://pbs.twimg.com/profile_images/1164780045/twitter_profile_400x400.jpg",
    bio: "Oz Clarke is a British wine writer and broadcaster, known for his enthusiastic and informative approach to wine. He has authored numerous books on wine and has appeared on television programs that bring wine education to a wider audience. Clarke's expertise and charismatic style have made him a beloved figure in the wine world.",
    awards: [
      "Order of the British Empire",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 40,
  },
  {
    name: "Tom Stevenson",
    img: "https://upload.wikimedia.org/wikipedia/en/c/cb/Tom_Stevenson_in_2006.jpg",
    bio: "Tom Stevenson is a leading wine writer, particularly renowned for his expertise in champagne and sparkling wines. He has authored several books, including the award-winning 'Christie’s World Encyclopedia of Champagne & Sparkling Wine.' Stevenson is respected for his deep knowledge and precise tasting skills.",
    awards: [
      "Roederer International Wine Writers’ Award",
      "Wine Spectator Critics Award",
    ],
    experience: 35,
  },
  {
    name: "David Schildknecht",
    img: "https://www.cephas.com/ImageThumbs/1228381/3/1228381_David_Schildknecht_wine_taster_and_writer_working_for_Robert_Parkers_Wine_Advocate.jpg",
    bio: "David Schildknecht is a wine critic known for his detailed and thoughtful reviews, particularly of wines from Germany, Austria, and France's Loire Valley. He has worked with 'The Wine Advocate' and other publications, earning a reputation for his intellectual approach to wine criticism.",
    awards: [
      "Wine Spectator Critics Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 25,
  },
  {
    name: "Raymond Blake",
    img: "https://lh3.googleusercontent.com/proxy/7OecBL5a3-Va9Q4P_5qFTFWb7H1JnccrqIYdex-5wfs3mdtVveO4gr5LixdyHmczLjghHflgY6ThEpzxFZXTkmHQ875e7AC3X0ldEyHHAxeLgIAIJbgGZHPw7A",
    bio: "Raymond Blake is an Irish wine writer and editor with a deep passion for Burgundy. He has contributed to several wine publications and is known for his insightful writing and dedication to exploring the intricacies of wine from various regions. Blake is also the author of books on Burgundy and Irish wine.",
    awards: [
      "Wine Enthusiast Wine Star Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 20,
  },
  {
    name: "Elin McCoy",
    img: "https://elinmccoy.com/wp-content/uploads/2010/03/screen-shot-2016-01-23-at-3-46-34-pm-2.png",
    bio: "Elin McCoy is an American wine critic and journalist, widely recognized for her biography of Robert Parker titled 'The Emperor of Wine.' McCoy writes for 'Bloomberg News' and other publications, offering her insights on global wine trends and the personalities that shape the industry.",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 30,
  },
  {
    name: "Fiona Beckett",
    img: "https://pbs.twimg.com/profile_images/1818025103080226817/bPfMzNgb_400x400.jpg",
    bio: "Fiona Beckett is a British food and wine writer, known for her expertise in food and wine pairing. She writes for various publications and maintains a popular blog, Matching Food & Wine. Beckett's work is appreciated for its practical advice and deep understanding of how food and wine complement each other.",
    awards: [
      "Roederer International Wine Writers’ Award",
      "Best Drink Writer - Fortnum & Mason",
    ],
    experience: 20,
  },
  {
    name: "Matthew Jukes",
    img: "https://www.matthewjukes.com/wp-content/uploads/2014/07/matthewjukes-hero1-845x684.jpg",
    bio: "Matthew Jukes is a British wine critic and writer, best known for his annual wine guide and contributions to various UK newspapers. Jukes specializes in discovering value wines and sharing his finds with a broad audience. His approachable style has earned him a loyal following among wine enthusiasts.",
    awards: [
      "International Wine Challenge Judge",
      "Wine Spectator Critics Award",
    ],
    experience: 25,
  },
  {
    name: "Sarah Jane Evans",
    img: "https://www.madridfusion.net/media/f9d8a393-f1b0-4925-9054-c301382c55b0_SARAH%20JANE%20EVANS%20600.jpg",
    bio: "Sarah Jane Evans is a British Master of Wine, wine writer, and judge. She is a former chairman of the Institute of Masters of Wine and has a particular interest in Spanish wines. Evans writes for several international publications and is known for her authoritative voice in the world of wine.",
    awards: ["Master of Wine", "Roederer International Wine Writers’ Award"],
    experience: 30,
  },
  {
    name: "Jamie Goode",
    img: "https://pbs.twimg.com/profile_images/1288053884523618305/BVHWRr0q_400x400.jpg",
    bio: "Jamie Goode is a British wine writer, blogger, and author known for his book 'The Science of Wine.' He has a background in plant biology, which informs his scientific approach to wine writing. Goode is a proponent of natural and organic wines, and his blog is widely read by both wine professionals and enthusiasts.",
    awards: [
      "Roederer International Wine Writers’ Award",
      "Wine Spectator Critics Award",
    ],
    experience: 20,
  },
  {
    name: "Michael Broadbent",
    img: "https://www.christies.com/-/media/images/features/articles/2016/08/22/michael-broadbent/main-michael-broadbent-with-glass-of-port-wine.jpg?h=1103&iar=0&w=1765&rev=32c1211fc39a43419cabb8a189297fa2&hash=0066aab7ac822bbfcbf1d2c180f1c31df101bc68",
    bio: "Michael Broadbent was a British wine critic, auctioneer, and author who played a significant role in the wine auction world. He was a pioneer in wine writing and known for his extensive tasting notes, particularly on older wines. Broadbent's work with Christie’s helped to shape the modern wine auction market.",
    awards: ["Order of the British Empire", "James Beard Foundation Award"],
    experience: 50,
  },
  {
    name: "Terry Theise",
    img: "https://www.papercitymag.com/wp-content/uploads/2016/11/IMG_1823-scaled.jpg",
    bio: "Terry Theise is an American wine importer and writer, known for his focus on German and Austrian wines, as well as Champagne. He has won numerous awards for his writing and is respected for his passionate advocacy of small-scale, artisanal winemakers. Theise's poetic and philosophical approach to wine has earned him a devoted following.",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 30,
  },
  {
    name: "Claude Dugat",
    img: "https://www.finewineexperience.com/files/images/testrun-claude-3-3.jpg",
    bio: "Claude Dugat is a renowned winemaker from Burgundy, not typically classified as a wine critic but highly influential in the industry. His wines are celebrated for their quality, and his insights into viticulture and winemaking are respected by wine critics and enthusiasts alike.",
    awards: [
      "Wine Spectator Critics Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 35,
  },
  {
    name: "Michel Bettane",
    img: "https://echos-bordeaux.com/wp-content/uploads/2012/03/bettane-nez.jpg",
    bio: "Michel Bettane is one of France's leading wine critics, known for his work with 'La Revue du vin de France' and his co-authorship of 'Le Grand Guide des Vins de France.' Bettane's expertise covers a wide range of French wines, and his ratings and reviews are highly regarded both in France and internationally.",
    awards: ["Best Wine Writer - France", "Decanter Power List"],
    experience: 40,
  },
  {
    name: "Thierry Desseauve",
    img: "https://www.wosa.co.za/Images/Standard/thierry-desseauve-tasting2.jpg",
    bio: "Thierry Desseauve is a prominent French wine critic and writer, known for his collaboration with Michel Bettane on 'Le Grand Guide des Vins de France.' Desseauve has a deep knowledge of French wines and is respected for his balanced and insightful reviews. His work has greatly influenced the perception of French wines around the world.",
    awards: ["Best Wine Writer - France", "Wine Spectator Critics Award"],
    experience: 35,
  },

  {
    name: "Richard Juhlin",
    img: "https://champagne-wp-production.s3.eu-north-1.amazonaws.com/wp-content/uploads/2023/03/30084916/richard-juhlin-by-berkeley-shirts33-kopiera.jpg",
    bio: "Richard Juhlin is a Swedish wine writer and one of the world’s foremost authorities on Champagne. He holds the world record for the number of Champagnes tasted and has authored several books on the subject. Juhlin's detailed tasting notes and ratings are highly respected in the Champagne community.",
    awards: ["Decanter Power List", "Wine Spectator Critics Award"],
    experience: 30,
  },
  {
    name: "Nick Stock",
    img: "https://www.peppers.co.nz/Portals/3/Images/Blog/Nick_Stock_351x235_2.jpg",
    bio: "Nick Stock is an Australian wine writer and critic, known for his work with 'Good Wine Guide' and various Australian wine publications. He is respected for his deep understanding of Australian wines and his ability to communicate wine in an engaging and accessible way. Stock's reviews are influential in the Australian wine market.",
    awards: [
      "Best Wine Writer - Australia",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 25,
  },
  {
    name: "Tyson Stelzer",
    img: "https://i0.wp.com/www.tysonstelzer.com/wp-content/uploads/2022/05/Tyson-low-res.jpg?fit=2000%2C2000&ssl=1",
    bio: "Tyson Stelzer is an Australian wine writer, author, and speaker, renowned for his expertise in Champagne and Australian wines. He has published numerous books and articles, and his Champagne guide is highly regarded. Stelzer is also known for his efforts in promoting wine education and appreciation in Australia.",
    awards: ["Best Wine Writer - Australia", "Wine Spectator Critics Award"],
    experience: 20,
  },
  {
    name: "Max Allen",
    img: "https://images.squarespace-cdn.com/content/v1/5bb788d2f4e5313e3e5aa940/1538986500783-D1Z0MGR89E18CITZSANP/Max+Allen+photo+by+Adrian+Lander.jpg?format=2500w",
    bio: "Max Allen is an Australian wine writer and author, known for his deep understanding of Australian terroir and sustainable winemaking practices. He has written several books on wine and contributes to leading wine publications in Australia. Allen's work often explores the relationship between wine, culture, and the environment.",
    awards: ["Best Wine Writer - Australia", "James Beard Foundation Award"],
    experience: 25,
  },
  {
    name: "Jay McInerney",
    img: "https://www.writerswrite.co.za/wp-content/uploads/2013/01/Jay-McInerney.jpg",
    bio: "Jay McInerney is an American novelist and wine critic, known for his wine columns in 'The Wall Street Journal' and 'House & Garden.' McInerney brings a literary flair to his wine writing, offering both insightful reviews and engaging narratives about the people and places behind the wines.",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 15,
  },
  {
    name: "Jordan Mackay",
    img: "https://149671331.v2.pressablecdn.com/wp-content/uploads/2021/11/jordan-mackay.jpg",
    bio: "Jordan Mackay is an American wine and food writer, known for his collaborative books on wine and whiskey. His work spans various publications, and he is highly regarded for his ability to explain complex wine concepts in an accessible way. Mackay's writing often explores the intersection of wine and culture.",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 15,
  },
  {
    name: "Kelli White",
    img: "https://www.wineenthusiast.com/wp-content/uploads/2023/05/Kelli_White_600x400.jpg",
    bio: "Kelli White is an American sommelier and wine writer, best known for her book 'Napa Valley, Then & Now.' She has worked at some of the top restaurants in the United States and now contributes to various wine publications. White's deep knowledge of Napa Valley wines and her engaging writing style have earned her a strong following in the wine community.",
    awards: [
      "Best Young Wine Writer",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 10,
  },
  {
    name: "Victoria James",
    img: "https://flamingomag.com/wp-content/uploads/2022/11/FEATIMAGE_Victoria-James-please-credit-Gary-He.jpg",
    bio: "Victoria James is an American sommelier and wine writer who gained recognition as one of the youngest sommeliers in the U.S. She is the author of 'Wine Girl,' a memoir about her experiences in the wine industry. James is also known for her work in promoting women in wine and her passion for natural wines.",
    awards: [
      "Best Young Sommelier",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 10,
  },
  {
    name: "Alice Feiring",
    img: "https://static01.nyt.com/images/2022/08/20/multimedia/20routine-alice-feiring-1/20routine-alice-feiring-1-mediumSquareAt3X.jpg",
    bio: "Alice Feiring is an American wine writer and journalist, widely recognized as a leading advocate for natural wines. She is the author of several books, including 'The Battle for Wine and Love,' and runs a popular newsletter, 'The Feiring Line.' Feiring's work is known for its strong opinions and deep passion for authenticity in wine.",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 20,
  },
  {
    name: "Jon Bonné",
    img: "https://worldoffinewine.com/wp-content/uploads/sites/9/2023/09/Bonne_JonbyErikCastro.jpg",
    bio: "Jon Bonné is an American wine writer and editor, known for his tenure as the wine editor for the 'San Francisco Chronicle' and his book 'The New California Wine.' Bonné's work focuses on innovative and sustainable winemaking practices, and he is recognized for his efforts to bring attention to the new generation of American winemakers.",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 15,
  },
  {
    name: "Hugh Johnson",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/09/Hugh_Johnson_OXCAM_2003.jpg",
    bio: "Hugh Johnson is a British wine writer and historian, one of the most respected and influential figures in the wine world. He is the author of several classic wine books, including 'The World Atlas of Wine' and 'Hugh Johnson's Pocket Wine Book.' Johnson's writing has educated generations of wine lovers and professionals.",
    awards: ["Order of the British Empire", "James Beard Foundation Award"],
    experience: 50,
  },
  {
    name: "André Dominé",
    img: "https://www.weinwisser.org/wp-content/uploads/A/n/Andre-Domine.png",
    bio: "André Dominé is a German wine writer and editor, known for his comprehensive wine books, including 'Wine,' which has been translated into multiple languages. Dominé's work is highly regarded for its depth and clarity, making complex wine regions and concepts accessible to a broad audience.",
    awards: ["Best Wine Book - France", "Wine Spectator Critics Award"],
    experience: 30,
  },
  {
    name: "Linda Murphy",
    img: "https://imengine.prod.srp.navigacloud.com/?uuid=e50814ae-a0f6-51c1-a9a3-3815271c174f&type=primary&q=75&width=1024",
    bio: "Linda Murphy is an American wine writer and editor, co-author of 'American Wine: The Ultimate Companion to the Wines and Wineries of the United States.' She has a background in journalism and has contributed to numerous wine publications. Murphy is known for her expertise in American wines and her clear, engaging writing style.",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 20,
  },
  {
    name: "Maggie Hoffman",
    img: "https://m.media-amazon.com/images/I/91wHlG9vR-L._SX450_CR0%2C0%2C450%2C450_.jpg",
    bio: "Maggie Hoffman is an American wine and drinks writer, known for her contributions to publications like 'Serious Eats' and her books on cocktails. She has a knack for making complex beverage concepts accessible and fun for a wide audience. Hoffman's work is celebrated for its creativity and practical advice for home bartenders.",
    awards: [
      "Best Drink Writer - America",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 15,
  },
  {
    name: "Paul Grieco",
    img: "https://cdn.vox-cdn.com/thumbor/FASaAwmR5B8ZztB0XO1go3AZhds=/56x0:943x665/1400x1050/filters:focal(56x0:943x665):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/39120196/12_Paul_20Grieco-1002.0.jpg",
    bio: "Paul Grieco is a renowned New York-based restaurateur and wine expert, best known for his passion for Riesling, which he promotes through his 'Summer of Riesling' campaign. Grieco's approach to wine is both educational and engaging, making him a beloved figure among both wine novices and experts.",
    awards: [
      "James Beard Foundation Award",
      "Roederer International Wine Writers’ Award",
    ],
    experience: 20,
  },
  {
    name: "Tom Cannavan",
    img: "https://iwsc.net/img/blog/medium-untitled-design-36.png",
    bio: "Tom Cannavan is a British wine writer, critic, and founder of 'wine-pages.com,' one of the most respected wine websites in the UK. He is known for his in-depth wine reviews and educational content, making wine more accessible to a broad audience. Cannavan's work has earned him numerous awards and recognition within the wine community.",
    awards: ["Best Wine Website", "Roederer International Wine Writers’ Award"],
    experience: 25,
  },
  {
    name: "Will Lyons",
    img: "https://www.oregonwinepress.com/pub/photo/LastCall_WillLyons_1000.jpg",
    bio: "Will Lyons is a British wine writer and columnist, known for his contributions to 'The Sunday Times' and other major publications. His writing covers a wide range of topics, from wine reviews to travel, and is appreciated for its clarity and depth. Lyons is also involved in wine education and events, making wine more approachable for the general public.",
    awards: [
      "Roederer International Wine Writers’ Award",
      "Wine Spectator Critics Award",
    ],
    experience: 20,
  },
  {
    name: "Stuart Pigott",
    img: "https://www.stuartpigott.de/wp-content/uploads/2019/07/IMG_6577-1024x1024.jpg",
    bio: "Stuart Pigott is a British wine writer and critic, particularly renowned for his expertise in German wines. He has authored several books on Riesling and is a regular contributor to wine publications. Pigott's work is known for its insightful analysis and deep understanding of the wines of Germany.",
    awards: ["Best Wine Writer - Germany", "Wine Spectator Critics Award"],
    experience: 25,
  },
  {
    name: "John Gilman",
    img: "https://www.wineberserkers.com/uploads/db0731/optimized/3X/0/e/0e6f7a9b56109387d2fa228d6ee7bd09d9f4a2b6_2_690x459.jpeg",
    bio: "John Gilman is an American wine writer and critic, best known for his publication 'View from the Cellar,' where he offers detailed reviews and insights on wines from around the world. Gilman is respected for his traditionalist approach to wine criticism and his extensive knowledge of classic wine regions.",
    awards: [
      "Roederer International Wine Writers’ Award",
      "James Beard Foundation Award",
    ],
    experience: 20,
  },
  {
    name: "Rebecca Gibb",
    img: "https://rebeccagibb.com/wp-content/uploads/2019/04/IMG_9496-Edit.jpeg",
    bio: "Rebecca Gibb is a British wine writer and Master of Wine, known for her work on the wines of New Zealand and other regions. She contributes to several wine publications and is respected for her precise tasting notes and thorough research. Gibb's expertise and approachable writing style have made her a trusted voice in the wine community.",
    awards: ["Master of Wine", "Roederer International Wine Writers’ Award"],
    experience: 15,
  },
];

module.exports = critics;