const recordService = require("../services/recordService");
const memberService = require("../services/memberService");

const getRecordForWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':workoutId' can not be empty" },
      });
  }
  try {
    const record = recordService.getRecordForWorkout(workoutId);
    const recordsWithAssociatedMembers = record.map((record) => {
      const memberId = record.memberId;
      if(!memberId) {
        res
        .status(400)
        .send({
          status: "FAILED",
          data: { error: "Record must have a member associated" },
        });
      }
      const member = memberService.getOneMember(memberId);
      return {
        ...record,
        member
      }
    });

    res.send({ status: "OK", data: recordsWithAssociatedMembers });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = { getRecordForWorkout };