//Const of module required
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const dbAuth = require("../../auth/models");
const db = require("../models");
const config = require("../../../config.json")["development"];
const multer = require("multer");
const path = require("path");
const xlsx = require("xlsx");
const Op = db.Sequelize.Op;


const PermissionsUser = dbAuth.PermissionsUser;
const Invoices = db.gtFacturas_Invoices;
const InvoicesRecords = db.gtFacturas_InvoicesRecords;
const InvoicesRecordsRelation = db.gtFacturas_InvoicesRecordsRelation;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: dataResult } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, dataResult, totalPages, currentPage };
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Uploads is the Upload_folder_name

    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "-" +
        new Date().toISOString().replace(/:/g, "-") +
        path.extname(file.originalname)
    );
  },
});
const maxSize = 1 * 10000 * 10000;

var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    var filetypes = /xls|xlsx|vnd.ms-excel|sheet/;
    var mimetype = filetypes.test(file.mimetype);
    console.log(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(
      "Error: File upload only supports the " +
        "following filetypes - " +
        filetypes
    );
  },
  // mypic is the name of file attribute
}).single("file");

var uploadImage = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    var filetypes = /jpg|png|jpge|bmp/;
    var mimetype = filetypes.test(file.mimetype);
    console.log(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb(
      "Error: File upload only supports the " +
        "following filetypes - " +
        filetypes
    );
  },
  // mypic is the name of file attribute
}).single("file");

function updateImageUrls(json, req) {
  const protocol = req.secure ? 'https' : 'http';
  const baseUrl = `${protocol}://${req.headers.host}/api/gtFacturas/uploads/`;
  const updatedJson = JSON.parse(JSON.stringify(json)); // Clonar el JSON para no modificar el original

  updatedJson.forEach(item => {
    item.invoicesrecords.image = baseUrl + item.invoicesrecords.image;
  });

  return updatedJson;
}


class InvoicesController {
  static async uploadInvoices(req, res) {
    try{
      upload(req, res, async function (err) {
        try{
          if (err) {
            // ERROR occurred (here it can be occurred due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
            res.send(err);
          } else {
            // SUCCESS, image successfully uploaded
            const workbook = xlsx.readFile(req.file.path); // Step 2
            let workbook_sheet = workbook.SheetNames; // Step 3
            let workbook_response = xlsx.utils.sheet_to_json(
              // Step 4
              workbook.Sheets[workbook_sheet[0]],
              { defval: "" }
            );

            Invoices.destroy({ truncate: { cascade: false } });

            const convertirFecha = (fecha) =>
              new Date(
                `20${fecha.split("-")[2]}-${fecha.split("-")[1]}-${
                  fecha.split("-")[0]
                }`
              )
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");
            const extraerDigitos = (cadena) => {
              const match = cadena.match(/^\d+(?=[-.])/);
              return match ? parseInt(match[0], 10) : null;
            };

            const formatedData = workbook_response.map((result) => ({
              NUMERO: result.numero,
              FECHA: convertirFecha(result.fecha),
              NIT: extraerDigitos(result.nit),
              NOMBRE: result.nombre,
              PEDIDO: result.pedido,
              ORDEN: result.orden,
              CONDICION: result.condicion,
              REMISION: result.remision,
              OBSERVACIO: result.observacio,
              OBSERVACI2: result.observaci2,
              ANU: result.anu,
              SUBTOTAL: result.subtotal,
              IVA: result.iva,
              EMPRESA: result.empresa,
              NOREMI: result.noremi,
              NOPEDIDO: result.nopedido,
              IVALIQUI: result.ivaliqui,
              TOTAL: result.total,
              REMI01: result.remi01,
              REMI02: result.remi02,
              REMI03: result.remi03,
              REMI04: result.remi04,
              REMI05: result.remi05,
              REMI06: result.remi06,
              REMI07: result.remi07,
              REMIGEN: result.remigen,
              VALDOLAR: result.valdolar,
              TASADIA: result.tasadia,
              FECHADOL: null,
              PESOBRUTO: result.pesobruto,
              RETFTEP: result.refttep,
              RETICAP: result.reticap,
              RETIVAP: result.retivap,
              RETFTEV: result.retftev,
              RETICAV: result.reticav,
              RETIVAV: result.retivav,
              PRECINTO: result.precinto,
              REMI08: result.remi08,
              REMI09: result.remi09,
              REMI10: result.remi10,
              REMI11: result.remi11,
              REMI12: result.remi12,
              REMI13: result.remi13,
              REMI14: result.remi14,
              REMI15: result.remi15,
              REMI16: result.remi16,
              REMI17: result.remi17,
              REMI18: result.remi18,
              REMI19: result.remi19,
              REMI20: result.remi20,
              FECVIG: convertirFecha(result.fecvig),
              NC: result.nc,
              RETCREP: result.retcrep,
              RETCREV: result.retcrev,
              NC_CODIGO: result.nc_codigo,
              NC_CONCEP: result.nc_concep,
              NC_SECCION: result.nc_seccion,
              NC_DESCRIP: result.nc_descrip,
              ND_CODIGO: result.nd_codigo,
              ND_CONCEP: result.nd_concep,
              ND_SECCION: result.nd_seccion,
              ND_DESCRIP: result.nd_descrip,
              NC_FACT: result.nc_fact,
              NC_FACTFEC: result.nc_factfec,
              ND_FACT: result.nd_fact,
              ND_FACTFEC: result.nd_factfec,
              OC1: result.oc1,
              OC2: result.oc2,
              OC3: result.oc3,
              OC4: result.oc4,
              OC5: result.oc5,
              OC6: result.oc6,
              OC7: result.oc7,
              OC8: result.oc8,
              OC9: result.oc9,
              OC10: result.oc10,
              PAGO_FEC1: result.pago_fec1,
              PAGO_FEC2: result.pago_fec2,
              PAGO_FEC3: result.pago_fec3,
              PAGO_FEC4: result.pago_fec4,
              PAGO_VAL1: result.pago_val1,
              PAGO_VAL2: result.pago_val2,
              PAGO_VAL3: result.pago_val3,
              PAGO_VAL4: result.pago_val4,
              PAGO_SALDO: result.pago_saldo,
            }));

            const invoicesCreated = await Invoices.bulkCreate(formatedData);
            res.status(200).send({
              // Step 5
              message: invoicesCreated,
            });
            //res.send("Success, Image uploaded!");
          }
        } catch (error) {
          res.status(500).send({
            // Step 5
            message: error,
          });
        }
      });
    } catch (error) {
      res.status(500).send({
        // Step 5
        message: error,
      });
    }
  }

  static async uploadImageInvoice(req, res) {
    try{
      uploadImage(req, res, async function (err) {
        try{
          if (err) {
            // ERROR occurred (here it can be occurred due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
            res.send(err);
          } else {
            //req.file.path

            const invoiceCreated = await InvoicesRecords.create({
              image: req.file.filename
            });


            const body = JSON.parse(req.body.body)
            for (i in body.invoices){
              let invoice = body.invoices[i]
              InvoicesRecordsRelation.create({
                invoicesrecordsid: invoiceCreated.id,
                invoicesid: invoice.id,
                payment: invoice.payment
              });
            }
            res.status(201).json({ message : "Success"});
          }
        } catch (error) {
          console.log(error)
          res.status(500).send({
            // Step 5
            message: error,
          });
        }
      });
    } catch (error) {
      res.status(500).send({
        // Step 5
        message: error,
      });
    }
  }

  static async getAssignUsers(req, res) {
    PermissionsUser.findAll({
      where: { userid: req.user.id },
      include: [
        {
          model: AppActions,
          as: "appactions",
          include: [
            {
              model: apps,
              as: "apps",
              attributes: ["nameApps", "description", "image", "url"],
            },
          ],
        },
      ],
      //includeIgnoreAttributes: false,
    })
      .then((result) => {
        // Resultado contiene los nombres filtrados
        const response = result.map((result) => ({
          nameApp: result.appactions.apps.nameApps,
          description: result.appactions.apps.description,
          image: result.appactions.apps.image,
          url: result.appactions.apps.url,
        }));
        const appsAssigned = [...new Set(response.map((a) => a.nameApp))].map(
          (nameApp) => response.find((a) => a.nameApp === nameApp)
        );
        res.status(201).json({ appsAssigned });
        //console.log(result);
      })
      .catch((err) => {
        // Manejo de errores
        console.error("Error:", err);
      });
  }

  static async getInvoices(req, res) {
    const { page, size, search } = req.query;
    var condition = search
      ? {
          [Op.or]: [
            { NIT: { [Op.like]: `%${search}%` } },
            { NUMERO: { [Op.like]: `%${search}%` } },
            { NOMBRE: { [Op.like]: `%${search}%` } },
            { CONDICION: { [Op.like]: `%${search}%` } },
            { OBSERVACIO: { [Op.like]: `%${search}%` } },
            { OBSERVACIO: { [Op.like]: `%${search}%` } },
          ],
        }
      : null;

    const { limit, offset } = getPagination(page, size);
    Invoices.findAndCountAll({
      where: condition,
      limit,
      offset,
      attributes: [
        "NUMERO",
        "FECHA",
        "FECVIG",
        "SUBTOTAL",
        "IVA",
        "SUBTOTAL",
        "IVA",
        "RETIVAV",
        "RETFTEV",
        "TOTAL",
        "PAGO_SALDO",
        [
          db.Sequelize.literal('(SELECT COALESCE(SUM(payment), 0) FROM gtFacturas_InvoicesRecordsRelations WHERE invoicesid = gtFacturas_Invoices.NUMERO)'),
          'total_payments'
        ],
        [
          db.Sequelize.literal('gtFacturas_Invoices.PAGO_SALDO - (COALESCE((SELECT SUM(payment) FROM gtFacturas_InvoicesRecordsRelations WHERE invoicesid = gtFacturas_Invoices.NUMERO), 0))'),
          'new_total'
        ]
      ]
    })
      .then((data) => {
        const response = getPagingData(data, page, limit);
        res.send(response);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  }

  static async getInvoice(req, res) {
    const { id } = req.query;
    var condition = id
      ? {
          [Op.or]: [
            { NUMERO: { [Op.eq]: parseInt(id) } }
          ],
        }
      : null;

    var conditionRecords = id
      ? {
          [Op.or]: [
            { invoicesid: { [Op.eq]: parseInt(id) } }
          ],
        }
      : null;

    const limit = 1

    let columns = []
    for(let key in Invoices.rawAttributes )   {
      columns.push(key);
    }
    columns.push(
      [
        db.Sequelize.literal('(SELECT COALESCE(SUM(payment), 0) FROM gtFacturas_InvoicesRecordsRelations WHERE invoicesid = gtFacturas_Invoices.NUMERO)'),
        'total_payments'
      ]
    )
    columns.push(
      [
        db.Sequelize.literal('gtFacturas_Invoices.PAGO_SALDO - (COALESCE((SELECT SUM(payment) FROM gtFacturas_InvoicesRecordsRelations WHERE invoicesid = gtFacturas_Invoices.NUMERO), 0))'),
        'new_total'
      ]
    )

    Invoices.findAndCountAll({
      where: condition,
      limit,
      attributes: columns
    }).then((invoice) => {
      InvoicesRecordsRelation.findAndCountAll({
        where: conditionRecords,
        include: [{
          model: InvoicesRecords,
          where: { NUMERO: db.Sequelize.col('invoicesid') },
          attributes: ['image'],
          as: 'invoicesrecords'
        }],
        attributes: [
          "id",
          "payment",
          "createdAt",
          
        ],
        raw: true,
        nest: true
      }).then((records) => {
        res.send({ invoice_data: invoice.rows, invoice_image: updateImageUrls(records.rows, req) });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Error query",
        });
      });
      
      
      
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error query",
      });
    });
    
  }
}
module.exports = InvoicesController;
