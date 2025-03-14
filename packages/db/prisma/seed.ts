
import { LANGUAGE_MAPPING } from "../../common/language/index";
import prisma from "../src";

(async () =>
  await prisma.language.createMany({
    data: Object.keys(LANGUAGE_MAPPING).map((language) => ({
      id: Number(LANGUAGE_MAPPING[language].internal),
      name: language,
      judge0Id: LANGUAGE_MAPPING[language].judge0,
    })),
  }))();
