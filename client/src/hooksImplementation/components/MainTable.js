import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import { axiosInstance } from "../../helpers/axios";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";

const MainTable = (props) => {
  const [clients, setClients] = useState([]);
  // const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    (async function allClients() {
      const allClients = await axiosInstance("/clients/all");
      if (allClients){
        setClients([...allClients.data]);
      }
    })();
  }, []);

  const statusArray = []
  const getDataArray = (clients) => {
    const datArray = [];
    clients.forEach((client) => {
      if (client.services.length > 0) {
        client.services.forEach((service) => {
          if (
            service.status !== "Baja" &&
            service.status !== "Completado" &&
            service.status !== "Cumplido"
          ) {
            datArray.push({
              abonado: client.abonado,
              name: client.name,
              clientId: client._id,
              service,
            });
          }
          if (!statusArray.includes(service.status)) {
            // setStatuses([...statuses, service.status]);
            statusArray.push(service.status)
          }
        });
      } else {
        datArray.push({
          abonado: client.abonado,
          name: client.name,
          clientId: client._id,
          service: { service: "Nada en implementacion" },
        });
      }
    });
    return datArray;
  };

  const data = React.useMemo(() => getDataArray(clients), [clients]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Abonado",
        accessor: "abonado",
        Cell: (d) => <Link to={`/clients/${d.value}`}>{d.value}</Link>,
      },
      {
        Header: "Nombre",
        accessor: "name",
        filterMethod: (filter, row) => row[filter.id].match(filter.value),
      },
      {
        id: "Servicio",
        Header: "Servicio",
        accessor: (d) =>
          d.service.plan
            ? `${d.service.service} - ${d.service.plan} Mbps`
            : d.service.service,
        Cell: (props) => <Badge>{props.value}</Badge>,
      },
      {
        id: "pm",
        Header: "PM",
        accessor: "pm",
      },
      {
        id: "im",
        Header: "Implementador",
        accessor: (d) => d.service.im,
      },
      {
        id: "serviceStatus",
        Header: "Status",
        accessor: (d) => d.service.status,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <>
      <table className="table table-hover" {...getTableProps()}>
        <thead className="table-light">
          {headerGroups.map((headerGroup,idx) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
              {headerGroup.headers.map((column,idx2) => (
                <th
                  {...column.getHeaderProps()}
                  key={`${idx}and${idx2}`}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody  {...getTableBodyProps()}>
          {rows.map((row,idx) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={idx}>
                {row.cells.map((cell,idx2) => {
                  return (
                    <td
                      {...cell.getCellProps() }
                      key={`${idx}and${idx2}`}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={() => console.log(statusArray)}>statuses</button>
    </>
  );
};

export default MainTable;
