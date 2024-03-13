import Country from "../models/countries";
import Destination from "../models/destinations";

export const COUNTRIES = [
  new Country("c1", "Italy", "#f44336"),
  new Country("c2", "Japan", "#2196f3"),
  new Country("c3", "France", "#4caf50"),
  new Country("c4", "Australia", "#ff9800"),
  new Country("c5", "United States", "#ffeb3b"),
  new Country("c6", "Spain", "#03a9f4"),
  new Country("c7", "Thailand", "#ff8000"),
  new Country("c8", "Brazil", "#8000ff"),
  new Country("c9", "Greece", "#0080ff"),
  new Country("c10", "Canada", "#ff0080"),
];

export const DESTINATIONS = [
  // Italy
  new Destination(
    "d1",
    "c1",
    "Rome - Colosseum",
    50,
    "70 AD",
    4.5,
    "Explore the ancient ruins of the Colosseum in Rome.",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg"
  ),
  new Destination(
    "d2",
    "c1",
    "Venice - Grand Canal",
    45,
    "5th century AD",
    4.3,
    "Take a romantic gondola ride along the picturesque Grand Canal in Venice.",
    "https://images.contentstack.io/v3/assets/blt827157d7af7bc6d4/blt994afad13c7af4a6/64477fbddf452f0942b2cb40/Venice_Web_Image.png?format=webp&width=646&height=577&fit=crop"
  ),
  // Japan
  new Destination(
    "d3",
    "c2",
    "Tokyo - Shibuya Crossing",
    60,
    "15th century",
    4.7,
    "Experience the bustling energy of Shibuya Crossing in Tokyo.",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Shibuya_scramble_crossing_during_Halloween_2023%2C_actually_less_crowded_than_usual%2C_high_police_presence_2.jpg/1920px-Shibuya_scramble_crossing_during_Halloween_2023%2C_actually_less_crowded_than_usual%2C_high_police_presence_2.jpg"
  ),
  new Destination(
    "d4",
    "c2",
    "Kyoto - Fushimi Inari Shrine",
    55,
    "711 AD",
    4.6,
    "Wander through the iconic red torii gates of Fushimi Inari Shrine in Kyoto.",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg/1280px-Torii_path_with_lantern_at_Fushimi_Inari_Taisha_Shrine%2C_Kyoto%2C_Japan.jpg"
  ),
  // France
  new Destination(
    "d5",
    "c3",
    "Paris - Eiffel Tower",
    70,
    "1889",
    4.9,
    "Enjoy panoramic views of Paris from the top of the Eiffel Tower.",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/800px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg"
  ),
  new Destination(
    "d6",
    "c3",
    "Nice - Promenade des Anglais",
    65,
    "19th century",
    4.8,
    "Stroll along the beautiful Promenade des Anglais overlooking the Mediterranean Sea in Nice.",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Promenade_des_Anglais_in_Nice.jpg/1280px-Promenade_des_Anglais_in_Nice.jpg"
  ),
  // Australia
  new Destination(
    "d7",
    "c4",
    "Sydney - Sydney Opera House",
    75,
    "1973",
    5.0,
    "Admire the iconic sails of the Sydney Opera House on the shores of Sydney Harbour.",
    "https://upload.wikimedia.org/wikipedia/commons/a/a0/Sydney_Australia._%2821339175489%29.jpg"
  ),
  new Destination(
    "d8",
    "c4",
    "Melbourne - Great Ocean Road",
    70,
    "1932",
    4.7,
    "Drive along the scenic Great Ocean Road and marvel at the Twelve Apostles rock formations near Melbourne.",
    "https://www.bookmundi.com/_ipx/f_jpeg&q_55&s_3072x1722/https://d3hne3c382ip58.cloudfront.net/files/uploads/bookmundi/resized/cmsfeatured/twelve-apostles-and-great-ocean-road-aerial-view-1508998152-785X440.jpg"
  ),
  // United States
  new Destination(
    "d9",
    "c5",
    "New York City - Times Square",
    80,
    "1904",
    4.5,
    "Experience the bright lights and bustling atmosphere of Times Square in New York City.",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/1200px-New_york_times_square-terabass.jpg"
  ),
  new Destination(
    "d10",
    "c5",
    "Los Angeles - Hollywood Sign",
    75,
    "1923",
    4.8,
    "Hike up to the Hollywood Sign for panoramic views of Los Angeles and the surrounding hills.",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Hollywood_Sign_%28Zuschnitt%29.jpg/800px-Hollywood_Sign_%28Zuschnitt%29.jpg"
  ),
  // Spain
  new Destination(
    "d11",
    "c6",
    "Barcelona - Sagrada Familia",
    65,
    "1882",
    4.6,
    "Marvel at the intricate architecture of the Sagrada Familia basilica in Barcelona.",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sagrada_Familia_%28July_2022%29_08.jpg/1200px-Sagrada_Familia_%28July_2022%29_08.jpg"
  ),
  new Destination(
    "d12",
    "c6",
    "Madrid - Retiro Park",
    60,
    "17th century",
    4.4,
    "Relax in the lush greenery of Retiro Park in the heart of Madrid.",
    "https://upload.wikimedia.org/wikipedia/commons/4/4e/Monumento_a_Alfonso_XII_de_Espa%C3%B1a_en_los_Jardines_del_Retiro_-_04.jpg"
  ),
  // Thailand
  new Destination(
    "d13",
    "c7",
    "Bangkok - Grand Palace",
    55,
    "1782",
    4.3,
    "Visit the opulent Grand Palace, home to the Thai royal family, in Bangkok.",
    "https://a.cdn-hotels.com/gdcs/production168/d707/c3156d7b-ce5a-4a5c-9a99-002b0ff57fe8.jpg"
  ),
  new Destination(
    "d14",
    "c7",
    "Phuket - Phi Phi Islands",
    50,
    "1947",
    4.2,
    "Explore the crystal-clear waters and pristine beaches of the Phi Phi Islands near Phuket.",
    "https://media-server.clubmed.com/image/jpeg/1024/auto/crop/center/70/https%3A%2F%2Fns.clubmed.com%2Fesap%2F2020%2F362%2Fimg%2Fblog%2Fphiphi-le.jpg"
  ),
  // Brazil
  new Destination(
    "d15",
    "c8",
    "Rio de Janeiro - Christ the Redeemer",
    85,
    "1931",
    4.9,
    "Take in panoramic views of Rio de Janeiro from the iconic Christ the Redeemer statue atop Corcovado mountain.",
    "https://cdn.britannica.com/54/150754-050-5B93A950/statue-Christ-the-Redeemer-Rio-de-Janeiro.jpg"
  ),
  new Destination(
    "d16",
    "c8",
    "São Paulo - Ibirapuera Park",
    80,
    "1954",
    4.8,
    "Relax and enjoy outdoor activities in the sprawling Ibirapuera Park in São Paulo.",
    "https://upload.wikimedia.org/wikipedia/commons/1/11/Parque_do_ibirapuera_visto_do_c%C3%A9u.jpg"
  ),
  // Greece
  new Destination(
    "d17",
    "c9",
    "Athens - Acropolis",
    70,
    "5th century BC",
    4.7,
    "Discover ancient history at the Acropolis of Athens, crowned by the iconic Parthenon temple.",
    "https://upload.wikimedia.org/wikipedia/commons/a/a7/The_Acropolis_of_Athens_viewed_from_the_Hill_of_the_Muses_%2814220794964%29.jpg"
  ),
  new Destination(
    "d18",
    "c9",
    "Santorini - Oia Sunset",
    65,
    "9th century BC",
    4.6,
    "Witness breathtaking sunsets over the Aegean Sea from the charming village of Oia in Santorini.",
    "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/3d/98/27.jpg"
  ),
  // Canada
  new Destination(
    "d19",
    "c10",
    "Toronto - CN Tower",
    90,
    "1976",
    4.9,
    "Ascend to the top of the CN Tower for panoramic views of Toronto and Lake Ontario.",
    "https://ew.com/thmb/yqY4BG9ZlLiFruuvw0BLsew3QjU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/drake-fae57f3eea8e4dab94467dd7f034f653.jpg"
  ),
  new Destination(
    "d20",
    "c10",
    "Vancouver - Stanley Park",
    85,
    "1888",
    4.7,
    "Explore the lush greenery and scenic views of Stanley Park in Vancouver.",
    "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_463,q_50,w_800/v1/clients/vancouverbc/Stanley_Park_TVan_a6141811-1d58-4eeb-a2d3-402b7a873330.jpg"
  ),
];
