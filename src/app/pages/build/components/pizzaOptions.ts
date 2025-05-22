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

export const pizzaOptions:PizzaOptions = {
  SIZES: [
    {
      name: "SMALL",
      description: "7 INCHES",
      price: "INR 200",
    //   image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: false,
    },
    {
      name: "MEDIUM",
      description: "10 INCHES",
      price: "INR 430",
    //   image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: false,
    },
    {
      name: "LARGE",
      description: "13 INCHES",
      price: "INR 630",
    //   image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: false,
    },
  ],
  DOUGH: [
    {
      name: "ESBY'S ORIGINAL",
      description: "",
      price: "",
    //   image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: true,
    },
    {
      name: "SOURDOUGH",
      description: "",
      price: "",
    //   image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: true,
    },
  ],
  SAUCE: [
    {
      name: "CREAMY ALFREDO",
      description: "",
      price: "",
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: true,
    },
    {
      name: "PESTO SAUCE",
      description: "",
      price: "INR 99",
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: false,
    },
    {
      name: "TAMATO SAUCE",
      description: "",
      price: "",
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: true,
    },
  ],
  CHEESE: [
    {
      name: "MOZZERELLA",
      description: "",
      price: "",
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: true,
    },
    {
      name: "FETA",
      description: "",
      price: "INR 69",
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: false,
    },
    {
      name: "CHEDDAR",
      description: "",
      price: "INR 39",
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: false,
    },
    {
      name: "PARMESAN",
      description: "",
      price: "",
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: true,
    },
  ],
  TOPPING: [
    {
      name: "ONION",
      description: "",
      price: "",
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: true,
    },
    {
      name: "TOMATO",
      description: "",
      price: "",
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: true,
    },
    {
      name: "CEPSICUM",
      description: "",
      price: "",
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: true,
    },
    {
      name: "MUSHROOM",
      description: "",
      price: "",
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: true,
    },
  ],
  SAUCES: [
    {
      name: "RANCH",
      description: "",
      price: "",
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: true,
    },
    {
      name: "CHIPOTLE",
      description: "",
      price: "",
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: true,
    },
    {
      name: "BUFFALO",
      description: "",
      price: "",
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: true,
    },
    {
      name: "BBQ",
      description: "",
      price: "",
      image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: true,
    },
  ],
  CRUST: [
    {
      name: "GARLIC",
      description: "",
      price: "",
    //   image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: true,
    },
    {
      name: "ORIGINAL",
      description: "",
      price: "INR 99",
    //   image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
      inclusive: false,
    },
  ],
};