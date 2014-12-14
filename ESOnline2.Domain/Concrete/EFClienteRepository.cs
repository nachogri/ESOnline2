using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using ESOnline2.Domain.Abstract;
using ESOnline2.Domain.Entities;

namespace ESOnline2.Domain.Concrete
{
    public class EFClienteRepository: IClienteRepository
    {
        private ESOnline2DbContext context = new ESOnline2DbContext();
        
        private List<Cliente> _Clientes;
        
        public EFClienteRepository()
        {
            //_Clientes = new List<Cliente>(){
            //            new Cliente{ID=1,
            //                        Nombre="Nacho",
            //                        Apellido="Gri",
            //                        Telefonos=new List<Telefono>()
            //                                {
            //                                 new Telefono{ID=1,Numero="42563343",Tipo=TipoTelefono.Casa.ToString()},
            //                                 new Telefono{ID=2,Numero="154651324",Tipo=TipoTelefono.Trabajo.ToString()}
            //                                },
            //                        Emails=new List<Email>()
            //                                {
            //                                    new Email{ID=1,Casilla="nachogri@gmail.com",Tipo=TipoEmail.Personal.ToString()}
            //                                },
            //                                CUIL="20-31135385-4",
            //                                CUIT="-",
            //                        Direcciones=new List<Direccion>()
            //                                {
            //                                    new Direccion{ID=1, Tipo=TipoDireccion.Sucursal.ToString(), Descripcion="1320 N Veitch st unit 320, Arlington Virginia 22201 , contacto: Supervisor Marcelo , horarios:L a V 9am a 18pm "}
            //                                },
            //                        Webs=new List<Web>()
            //                                {
            //                                    new Web{ID=1,Tipo=TipoWeb.Personal.ToString(),URL="www.google.com"}
            //                                },
            //                        Favorito=false
            //                        },
            //            new Cliente{ID=2,
            //                        Nombre="Melisa",
            //                        Apellido="Ongaro",
            //                        Telefonos=new List<Telefono>()
            //                                {
            //                                 new Telefono{ID=3,Numero="42576807",Tipo=TipoTelefono.Casa.ToString()},
            //                                 new Telefono{ID=4,Numero="115465783",Tipo=TipoTelefono.Trabajo.ToString()}
            //                                },
            //                        Emails=new List<Email>()
            //                                {
            //                                    new Email{ID=2,Casilla="mel.ongaro@gmail.com",Tipo=TipoEmail.Personal.ToString()}
            //                                },
            //                        CUIL="-",
            //                        CUIT="-",
            //                        Favorito=true
            //                        },
            //            new Cliente{ID=3,
            //                        Nombre="Franco",
            //                        Apellido="Gri",
            //                        Direcciones=new List<Direccion>()
            //                                {
            //                                    new Direccion{ID=1, Tipo=TipoDireccion.Unica.ToString(),Descripcion="calle 150 N1954, Berazategui, Buenos Aires, CP 1884"}
            //                                },
            //                        Emails=new List<Email>()
            //                                {
            //                                    new Email{ID=3,Casilla="francourielgri@gmail.com",Tipo=TipoEmail.Trabajo.ToString()}
            //                                },
            //                        Webs=new List<Web>()
            //                                {
            //                                    new Web{ID=2,Tipo=TipoWeb.Personal.ToString(),URL="www.youtube.com"}
            //                                }
            //                        }
            //        };                   
        }


        public IEnumerable<Cliente> GetAll()
        {
            return context.Clientes.AsEnumerable();
        }

        public Cliente Get(int id)
        {
           
            return context.Clientes.Find(id);
        }

        public Cliente Add(Cliente cliente)
        {
            if (cliente == null)
            {
                throw new ArgumentNullException("Cliente");
            }
          

            context.Clientes.Add(cliente);
            context.SaveChanges();

            return cliente;
        }

        public void Remove(int id)
        {
           
            Cliente cliente = context.Clientes.Find(id);
            context.Clientes.Remove(cliente);

            context.SaveChanges();
        }

        public bool Update(Cliente cliente)
        {
            if (cliente == null)
            {
                throw new ArgumentNullException("Cliente");
            }
           
            Cliente dbentry = context.Clientes.Find(cliente.ID);
            
            if (dbentry != null)
            {
                dbentry.Nombre = cliente.Nombre;
                dbentry.Apellido = cliente.Apellido;
                dbentry.CUIL = cliente.CUIL;
                dbentry.CUIT = cliente.CUIT;
                dbentry.Notas = cliente.Notas;
                dbentry.Imagen = cliente.Imagen;
                dbentry.Favorito = cliente.Favorito;
                dbentry.Direcciones = cliente.Direcciones;
                dbentry.Emails = cliente.Emails;
                dbentry.Telefonos = cliente.Telefonos;
                dbentry.Webs = cliente.Webs;
                

                //foreach (Direccion direccion in cliente.Direcciones)
                //{
                //    if (direccion.ID != default(int))
                //    {
                //        Direccion dbentryDireccion = context.Direcciones.Find(direccion.ID);
                //        dbentryDireccion.Descripcion = direccion.Descripcion;
                //        dbentryDireccion.Tipo = direccion.Tipo;
                //    }
                //    else
                //        if (dbentry.Direcciones != null)
                //            dbentry.Direcciones.Add(direccion);
                //        else
                //        {
                //            dbentry.Direcciones = new List<Direccion>();
                //            dbentry.Direcciones.Add(direccion);
                //        }
                //}


                //foreach (Email email in cliente.Emails)
                //{
                //    if (email.ID != default(int))
                //    {
                //        Email dbentryEmail = context.Emails.Find(email.ID);
                //        dbentryEmail.Casilla = email.Casilla;
                //        dbentryEmail.Tipo = email.Tipo;
                //    }
                //    else
                //        if (dbentry.Emails != null)
                //            dbentry.Emails.Add(email);
                //        else
                //        {
                //            dbentry.Emails = new List<Email>();
                //            dbentry.Emails.Add(email);
                //        }
                //}

                //foreach (Telefono Telefono in cliente.Telefonos)
                //{
                //    if (Telefono.ID != default(int))
                //    {
                //        Telefono dbentryTelefono = context.Telefonos.Find(Telefono.ID);
                //        dbentryTelefono.Numero = Telefono.Numero;
                //        dbentryTelefono.Tipo = Telefono.Tipo;
                //    }
                //    else
                //        dbentry.Telefonos.Add(Telefono);
                //}


                //foreach (Web Web in cliente.Webs)
                //{
                //    if (Web.ID != default(int))
                //    {
                //        Web dbentryWeb = context.Webs.Find(Web.ID);
                //        dbentryWeb.URL = Web.URL;
                //        dbentryWeb.Tipo = Web.Tipo;
                //    }
                //    else
                //        dbentry.Webs.Add(Web);
                //}
            }


            context.SaveChanges();
            return true;
        }
    }
}
