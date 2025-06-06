type Option = {
  name: string;
  description: string;
  price: string;
  image?: string;
  inclusive: boolean;
};

type PizzaOptions = {
  SIZES: Option[];
  DOUGH: Option[];
  SAUCE: Option[];
  CHEESE: Option[];
  TOPPING: Option[];
  SAUCES: Option[];
  CRUST: Option[];
};

export const pizzaOptions: PizzaOptions = {
  SIZES: [
    {
      name: "SMALL",
      description: "7 INCHES",
      price: "INR 200",
      inclusive: false,
    },
    {
      name: "MEDIUM",
      description: "10 INCHES",
      price: "INR 430",
      inclusive: false,
    },
    {
      name: "LARGE",
      description: "13 INCHES",
      price: "INR 630",
      inclusive: false,
    },
  ],
  DOUGH: [
    {
      name: "ESBY'S ORIGINAL",
      description: "",
      price: "INR 530",
      inclusive: false,
    },
    {
      name: "SOURDOUGH",
      description: "",
      price: "INR 630",
      inclusive: false,
    },
  ],
  SAUCE: [
    {
      name: "CREAMY ALFREDO",
      description: "",
      price: "INR 630",
      inclusive: false,
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
    },
    {
      name: "PESTO SAUCE",
      description: "",
      price: "INR 99",
      inclusive: false,
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
    },
    {
      name: "TAMATO SAUCE",
      description: "",
      price: "INR 30",
      inclusive: false,
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
    },
  ],
  CHEESE: [
    {
      name: "MOZZERELLA",
      description: "",
      price: "INR 50",
      inclusive: false,
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
    },
    {
      name: "FETA",
      description: "",
      price: "INR 40",
      inclusive: false,
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
    },
    {
      name: "CHEDDAR",
      description: "",
      price: "INR 39",
      inclusive: false,
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
    },
    {
      name: "PARMESAN",
      description: "",
      price: "INR 50",
      inclusive: false,
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
    },
  ],
  TOPPING: [
    {
      name: "ONION",
      description: "",
      price: "INR 50",
      inclusive: false,
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
    },
    {
      name: "TOMATO",
      description: "",
      price: "INR 55",
      inclusive: false,
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
    },
    {
      name: "CEPSICUM",
      description: "",
      price: "INR 59",
      inclusive: false,
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
    },
    {
      name: "MUSHROOM",
      description: "",
      price: "INR 60",
      inclusive: false,
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
    },
  ],
  SAUCES: [
    {
      name: "RANCH",
      description: "",
      price: "INR 50",
      inclusive: false,
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
    },
    {
      name: "CHIPOTLE",
      description: "",
      price: "INR 60",
      inclusive: false,
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
    },
    {
      name: "BUFFALO",
      description: "",
      price: "INR 55",
      inclusive: false,
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
    },
    {
      name: "BBQ",
      description: "",
      price: "INR 50",
      inclusive: false,
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
    },
  ],
  CRUST: [
    {
      name: "GARLIC",
      description: "",
      price: "INR 50",
      inclusive: false,
      //   image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
    },
    {
      name: "ORIGINAL",
      description: "",
      price: "INR 99",
      inclusive: false,
      //   image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
    },
  ],
};