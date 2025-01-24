import { useEffect } from "react";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { UpdateStatus } from "./types";
import { Button } from "primereact/button";
import { useLocation } from "react-router-dom";
import { useUpdateCheck } from "./useUpdateCheck";
import { useTranslation } from "react-i18next";

const VersionCheck = () => {
  let location = useLocation();
  const versionToast: any = useRef<any>(null);
  const setTimer: any = useRef(null);
  const { t } = useTranslation();
  //this hook for check version update
  const { status, checkUpdate, reloadPage } = useUpdateCheck({
    type: "manual",
  });

  const checkVersion = () => {
    if (setTimer.current === null) {
      checkUpdate();
      setTimer.current = setTimeout(() => {
        clearTimeout(setTimer.current);
        setTimer.current = null;
      }, 30000);
    }
  };

  useEffect(() => {
    if (status !== UpdateStatus.available) {
      checkVersion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (status === UpdateStatus.available) {
      versionToast.current.show({
        severity: "success",
        sticky: true,
        closable: false,
        content: (
          <div className="flex flex-wrap">
            <div className="text-center col-8">
              <h6>{t("metadata.version.versionCheck")}</h6>
            </div>
            <div className="col-2">
              <Button
                type="button"
                label={`${t("components.button.name.refresh")}`}
                className="p-button-success"
                onClick={reloadPage}
              />
            </div>
          </div>
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return <Toast ref={versionToast} position="bottom-center" />;
};

export default VersionCheck;
