"use server";

import { ArkhamInvestigatorCard } from "@/local_resources/arkham-types";

export const getAllInvestigators = async (): Promise<
  ArkhamInvestigatorCard[]
> => {
  try {
    const response = await fetch(
      "https://arkhamdb.com/api/public/cards/?_format=json",
    );
    if (!response.ok) {
      throw new Error(
        `HTTP error! Failed to fetch from Arkhamdb status: ${response.status}`,
      );
    }
    const allCards: ArkhamInvestigatorCard[] = await response.json();
    const investigatorCards = allCards.filter(
      (card) => card.type_code === "investigator",
    );
    // filter duplications
    const filtered_investigatorCards = investigatorCards.filter(
      (card, index, self) =>
        index === self.findIndex((c) => c.code === card.code),
    );
    const morefiltered = filtered_investigatorCards.map((
      card
    ) => ({
      code: card.code.toLowerCase(),
      name: card.name,
      subname: card.subname,
      health: card.health,
      sanity: card.sanity,
      willpower: card.skill_willpower,
      intellect: card.skill_intellect,
      combat: card.skill_combat,
      agility: card.skill_agility,
      real_text: card.real_text,
      imagesrc: card.imagesrc || "",


      // Add any additional filtering or transformation logic here
    }));
    console.log( morefiltered,"Filtered investigators:");
    return filtered_investigatorCards;
  } catch (error) {
    console.error(error);
    return [];
  }
};
