const { Diary } = require("../../models");

const getDiaryOnDate = async (req, res) => {
  const ownerId = req.user._id;
  const { date } = req.params;

  const filterForFindDiary = {
    $and: [{ date: { $eq: date } }, { owner: { $eq: ownerId } }],
  };

  const diaryOnDate = await Diary.findOne(filterForFindDiary);

  if (!diaryOnDate) {
    return res.json({
      status: "Success",
      code: 200,
      message: `Diary on date ${date} is empty`,
      data: {
        productList: [],
      },
    });
  }

  res.json({
    status: "Success",
    code: 200,
    message: `Diary on date ${date}`,
    data: diaryOnDate,
  });
};

module.exports = getDiaryOnDate;