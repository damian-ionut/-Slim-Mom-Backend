const { Diary, Product } = require("../../models");

const addProduct = async (req, res) => {
  const { _id } = req.user;
  const { title, weight, date } = req.body;

  const filterForFindCalories = [{ "title.ua": title }, { "title.ru": title }];
  const optionsForFindCalories = {
    categories: 0,
    weight: 0,
    title: 0,
    groupBloodNotAllowed: 0,
    _id: 0,
    __v: 0,
  };
  const productData = await Product.find().or(
    filterForFindCalories,
    optionsForFindCalories
  );
  const calories = productData[0].calories;

  const filterForFindDiary = {
    $and: [{ date: { $eq: date } }, { owner: { $eq: _id } }],
  };
  const userDiary = await Diary.findOne(filterForFindDiary);

  if (!userDiary) {
    const kcal = (weight * calories) / 100;
    const newProduct = await Diary.create({
      date: date,
      productList: [
        {
          title: title,
          weight: weight,
          calories: kcal,
        },
      ],
      owner: _id,
    });

    res.status(201).json({
      status: "Created",
      code: 201,
      message: "New diary entry created, product added.",
      data: newProduct,
    });
  }

  if (userDiary) {
    const kcal = (weight * calories) / 100;
    const addedProduct = {
      title: title,
      weight: weight,
      calories: kcal,
    };
    const filterForUpdateDiary = { date: date, owner: _id };
    const optionsForUpdateDiary = {
      $push: { productList: { ...addedProduct } },
    };
    await Diary.updateOne(filterForUpdateDiary, optionsForUpdateDiary);

    res.status(201).json({
      status: "Created",
      code: 201,
      message: "Diary entry updated, product added.",
      data: addedProduct,
    });
  }
};

module.exports = addProduct;