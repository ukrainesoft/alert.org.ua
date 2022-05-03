import { RegionStatus } from "@/types/RegionStatus";
import { Status } from "@/types/Status";
import { i18n } from "../../i18n/i18n";
const { t } = i18n.global;

export function getTranslatedMetaInfo(regionStatuses: RegionStatus[]) {
  const regionsInADanger = regionStatuses.filter(
    (regionStatus: RegionStatus) => regionStatus.status === Status.ALERT
  );
  const regionsInADangerList = regionsInADanger
    .map((regionStatus: RegionStatus) => regionStatus.region.id)
    .join(", ");

  let title = t("message.meta_title_safe");
  if (regionsInADanger.length === 1) {
    title = t("message.meta_title_alert_singular", {
      title: t("region." + regionsInADanger[0].region.id),
    });
  } else if (regionsInADanger.length > 1) {
    title = t("message.meta_title_alert_plural", {
      count: regionsInADanger.length,
    });
  }

  const description =
    regionsInADanger.length > 0
      ? t("message.meta_description_alert", {
          regionsList: regionsInADangerList,
        })
      : t("message.meta_description_safe");

  return {
    title,
    meta: [
      { property: "og:title", content: title },
      {
        property: "og:image",
        content: getOgImage(regionsInADanger),
      },
      {
        property: "og:description",
        content: description,
      },
    ],
  };
}

// TODO Move to the config file
const META_OG_CONFIG = {
  "og:image": "https://alert.org.ua/ukraine.svg",
};

// TODO Move titles to the i18n level
const getOgImage = (regionStatuses: RegionStatus[]) =>
  META_OG_CONFIG["og:image"] +
  "?" +
  regionStatuses
    .map((regionStatus: RegionStatus) => regionStatus.region.id)
    .join(",");
