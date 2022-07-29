import { RegionStatus } from "@/types/RegionStatus";
import { Status } from "@/types/Status";
import { i18n } from "../../i18n/i18n";
const { t } = i18n.global;

export function getTranslatedMetaInfo(regionStatuses: RegionStatus[]) {
  const regionsInADanger = regionStatuses.filter(
    (regionStatus: RegionStatus) => regionStatus.status === Status.ALERT
  );
  const regionsInADangerList = regionsInADanger
    .map((regionStatus: RegionStatus) => regionStatus.regionId)
    .join(", ");

  let title = t("message.meta_title_safe");
  if (regionsInADanger.length === 1) {
    title = t("message.meta_title_alert_singular", {
      title: t("region." + regionsInADanger[0].regionId),
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
        content: process.env.VUE_APP_OG_IMAGE,
      },
      {
        property: "og:description",
        content: description,
      },
    ],
  };
}
