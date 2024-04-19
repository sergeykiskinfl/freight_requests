import {
  Table,
  withTableSorting,
  Link,
  Button,
  Text,
  Icon,
  TextInput,
  TableColumnConfig,
} from "@gravity-ui/uikit";
import { useState, useEffect, useRef, useDeferredValue } from "react";

import { Gear, TrashBin, Plus, Magnifier } from "@gravity-ui/icons";

import "../App.css";

// Модальные окна
// Для создания транспортной заявки
import CreateModal from "./CreateModal";
// Для изменения транспортной заявки
import UpdateModal from "./UpdateModal";
// Для удаления транспортной заявки
import DeleteModal from "./DeleteModal";

import { FrReqRender, FrReqUpdate } from "../interfaces";

export default function FrReqMainContent(): JSX.Element {
  const [frRegs, setFrRegs] = useState<FrReqRender[]>([]);
  const [filteredFrRegs, setFilteredFrReqs] = useState<FrReqRender[]>([]);
  const [isEditMode, setEditMode] = useState<boolean>(false);

  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const [hideCompletedReq, setHideCompletedReq] = useState<boolean>(false);
  const [inputFilter, setInputFilter] = useState<string>("");

  const defferedInputFilter = useDeferredValue(inputFilter);

  // Объект для хранения текущей заявки при изменении/удалении
  const frReqCurrent = useRef<FrReqUpdate>({
    id: 1,
    status: "новая",
    client_brand: "",
    freighter_name: "",
    phone: "",
    ati: "",
    comment: "",
  });

  const columns: TableColumnConfig<unknown>[] = [
    { id: "id", name: "Номер заявки", align: "center", meta: { sort: true } },
    { id: "timestamp", name: "Дата", align: "center", meta: { sort: true } },
    {
      id: "client_brand",
      name: "Название фирмы клиента",
      align: "center",
      meta: { sort: true },
    },
    {
      id: "freighter_name",
      name: "ФИО перевозчика",
      align: "center",
      meta: { sort: true },
    },
    {
      id: "phone",
      name: "Контактный телефон",
      align: "center",
      meta: { sort: true },
    },
    {
      id: "comment",
      name: "Комментарий",
      align: "center",
    },
    { id: "status", name: "Статус", align: "center", meta: { sort: true } },
    { id: "ati", name: "ATI", align: "center", meta: { sort: true } },
  ];

  // Дополнительные колонки режима редактирования
  if (isEditMode) {
    columns.push({ id: "updateBtn", name: "Редактировать", align: "center" });
    columns.push({ id: "deleteBtn", name: "Удалить", align: "center" });
  }

  // Сортировка таблицы
  const FrReqTable = withTableSorting(Table);

  // Получение всех заявок
  async function getFrReqs() {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/fr_req`);

      if (response.ok) {
        const json = await response.json();

        const formattedArr = [...json].map((item) => {
          const formattedItem = { ...item };
          const {
            status,
            client_brand,
            freighter_name,
            phone,
            ati,
            comment,
            id,
          } = item;
          const intermediateItem = {
            id,
            status,
            client_brand,
            freighter_name,
            phone,
            ati,
            comment,
          };

          const formatter = new Intl.DateTimeFormat("ru", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          });

          formattedItem["timestamp"] = formatter.format(
            new Date(formattedItem["timestamp"])
          );

          formattedItem["ati"] = (
            <Link href={formattedItem["ati"]}>{formattedItem["ati"]}</Link>
          );

          formattedItem["updateBtn"] = (
            <Button
              view="outlined-action"
              onClick={() => {
                frReqCurrent.current = intermediateItem;
                setOpenUpdateModal(true);
              }}
            >
              <Icon data={Gear} size={18} />
            </Button>
          );

          formattedItem["deleteBtn"] = (
            <Button
              view="outlined-danger"
              onClick={() => {
                frReqCurrent.current = intermediateItem;
                setOpenDeleteModal(true);
              }}
            >
              <Icon data={TrashBin} size={18} />
            </Button>
          );

          return formattedItem;
        });

        setFrRegs([...formattedArr]);

        let intermediateRegs = [...formattedArr];

        if (hideCompletedReq) {
          intermediateRegs = [...intermediateRegs].filter(
            (item) => item["status"] !== "завершено"
          );
        }

        if (inputFilter !== "") {
          intermediateRegs = intermediateRegs.filter((item) => {
            return item["freighter_name"]
              .toLocaleLowerCase()
              .includes(defferedInputFilter.toLocaleLowerCase());
          });
        }

        setFilteredFrReqs([...intermediateRegs]);
      } else {
        console.error("HTTP Error: " + response.status);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("useEffect error.message === ", error.message);
      }
    }
  }

  // Скрыть/показать завершенные заявки
  function handleHideCompetedReq() {
    let intermediateRegs = [...frRegs];

    if (!hideCompletedReq) {
      intermediateRegs = [...intermediateRegs].filter(
        (item) => item["status"] !== "завершено"
      );

      if (inputFilter !== "") {
        intermediateRegs = intermediateRegs.filter((item) => {
          return item["freighter_name"]
            .toLocaleLowerCase()
            .includes(defferedInputFilter.toLocaleLowerCase());
        });
      }

      setFilteredFrReqs([...intermediateRegs]);
    } else {
      if (inputFilter !== "") {
        intermediateRegs = intermediateRegs.filter((item) => {
          return item["freighter_name"]
            .toLocaleLowerCase()
            .includes(defferedInputFilter.toLocaleLowerCase());
        });
      }

      setFilteredFrReqs([...intermediateRegs]);
    }
  }

  useEffect(() => {
    getFrReqs();
  }, []);

  // Фильтр по ФИО перевозчика
  useEffect(() => {
    let intermediateRegs = [...frRegs];
    if (inputFilter !== "") {
      intermediateRegs = intermediateRegs.filter((item) => {
        return item["freighter_name"]
          .toLocaleLowerCase()
          .includes(defferedInputFilter.toLocaleLowerCase());
      });

      if (hideCompletedReq) {
        intermediateRegs = [...intermediateRegs].filter(
          (item) => item["status"] !== "завершено"
        );
      }

      setFilteredFrReqs([...intermediateRegs]);
    } else {
      console.log("inputFilter", inputFilter);

      if (hideCompletedReq) {
        intermediateRegs = [...intermediateRegs].filter(
          (item) => item["status"] !== "завершено"
        );
      }

      setFilteredFrReqs([...intermediateRegs]);
    }
  }, [inputFilter]);

  return (
    <section>
      <h1 style={{ marginBottom: "30px" }}>Заявки на перевозку</h1>
      <div>
        <div className="edit-container">
          <div style={{ display: "flex" }}>
            <Text>Количество {filteredFrRegs.length}</Text>
            <TextInput
              placeholder="Иванов Иван Иванович"
              label="ФИО перевозчика"
              name="freighter_name"
              startContent={
                <div style={{ paddingRight: "5px", paddingLeft: "5px" }}>
                  <Icon data={Magnifier} size={18} />
                </div>
              }
              style={{
                maxWidth: "500px",
                minWidth: "200px",
                marginLeft: "30px",
                marginRight: "30px",
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setInputFilter(e.target.value);
              }}
            />
          </div>
          <div className="edit-btn-container">
            <Button view="action" onClick={() => setEditMode(!isEditMode)}>
              {isEditMode ? "Просматривать" : "Редактировать"}
            </Button>
            <Button
              view="action"
              onClick={() => {
                setHideCompletedReq(!hideCompletedReq);
                handleHideCompetedReq();
              }}
            >
              {hideCompletedReq ? "Показать завершенные" : "Скрыть завершенные"}
            </Button>
            {isEditMode ? (
              <>
                <Button view="action" onClick={() => setOpenCreateModal(true)}>
                  <Icon data={Plus} size={18} />
                  Создать
                </Button>
              </>
            ) : null}
          </div>
        </div>
        {filteredFrRegs.length > 0 ? (
          <FrReqTable data={filteredFrRegs} columns={columns} />
        ) : (
          <div style={{ textAlign: "center", paddingTop: "20px" }}>
            <Text variant="display-1">Нет заявок</Text>
          </div>
        )}
      </div>
      <CreateModal
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        getFrReqs={getFrReqs}
      />
      <UpdateModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        getFrReqs={getFrReqs}
        ref={frReqCurrent}
      />
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        getFrReqs={getFrReqs}
        ref={frReqCurrent}
      />
    </section>
  );
}
