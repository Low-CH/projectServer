import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Particular } from "../types.ts";

let particulars: Particular[] = [
  {
    id: "e8eec42e-034a-47b0-a899-5a1f792e9276",
    firstName: "Chern Hwee",
    lastName: "Low",
    job: "Software Developer",
    gender: "Male",
  },
  {
    id: "4c4523fb-fcc0-4f76-a7af-d6c72ed62961",
    firstName: "Jenny",
    lastName: "Chua",
    job: "UI Designer",
    gender: "Female",
  },
  {
    id: "3ce54131-1834-4d82-b0b7-d1a77718dc53",
    firstName: "Steven Paul",
    lastName: "Jobs",
    job: "Apple CEO",
    gender: "Male",
  },
];

// @desc    Get all particulars
// @route   GET /api/v1/particulars
const getParticulars = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: particulars,
  };
};

// @desc    Get single particular
// @route   GET /api/v1/particulars/:id
const getParticular = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const particular: Particular | undefined = particulars.find((p) =>
    p.id === params.id
  );
  if (particular) {
    response.status = 200;
    response.body = {
      success: true,
      data: particular,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No particulars found",
    };
  }
};

// @desc    Add particular
// @route   POST /api/v1/particulars
const addParticular = async (
  { request, response }: { request: any; response: any },
) => {
  const body = request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "Unable to add a particular",
    };
  } else {
    const particular: Particular = await body.value;
    particular.id = v4.generate();
    particulars.push(particular);
    response.status = 201;
    response.body = {
      success: true,
      data: particulars,
    };
  }
};

// @desc    Update particular
// @route   PUT /api/v1/particulars/:id
const updateParticular = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const particular: Particular | undefined = particulars.find((p) =>
    p.id === params.id
  );

  if (particular) {
    const body = request.body();

    const updateData: {
      firstName?: string;
      lastName?: string;
      job?: string;
      gender?: string;
    } = await body.value;

    particulars = particulars.map((p) =>
      p.id === params.id ? { ...p, ...updateData } : p
    );

    response.status = 200;
    response.body = {
      success: true,
      data: particulars,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Unable to edit a particular",
    };
  }
};

// @desc    Delete particular
// @route   DELETE /api/v1/particulars/:id
const deleteParticular = (
  { params, response }: { params: { id: string }; response: any },
) => {
  particulars = particulars.filter((p) => p.id !== params.id);
  response.body = {
    success: true,
    data: particulars,
    msg: "Personel info has been removed",
  };
};

export {
  getParticulars,
  getParticular,
  addParticular,
  updateParticular,
  deleteParticular,
};
