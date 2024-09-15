const { Diary, Product } = require("../../models");

const addProduct = async (req, res) => {
  const { _id } = req.user; 
  const { title, weight, date } = req.body; 

  try {
    const productData = await Product.findOne({ "title.ua": title }) || 
                        await Product.findOne({ "title.ru": title });

    if (!productData) {
      return res.status(404).json({
        status: "Error",
        code: 404,
        message: "Product not found",
      });
    }

    const calories = productData.calories; 
    const kcal = (weight * calories) / 100;

    const userDiary = await Diary.findOne({ date, owner: _id });

    if (!userDiary) {
      const newProduct = await Diary.create({
        date,
        productList: [{
          title,
          weight,
          calories: kcal,
        }],
        owner: _id,
      });

      return res.status(201).json({
        status: "Created",
        code: 201,
        message: "New diary entry created, product added.",
        data: newProduct,
      });
    } else {
      const addedProduct = {
        title,
        weight,
        calories: kcal,
      };

      const updatedDiary = await Diary.updateOne(
        { date, owner: _id },
        { $push: { productList: addedProduct } }
      );

      if (!updatedDiary.nModified) {
        return res.status(500).json({
          status: "Error",
          code: 500,
          message: "Failed to add product to diary",
        });
      }

      return res.status(201).json({
        status: "Created",
        code: 201,
        message: "Diary entry updated, product added.",
        data: addedProduct,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      code: 500,
      message: "Failed to add product",
      error: error.message,
    });
  }
};

module.exports = addProduct;
