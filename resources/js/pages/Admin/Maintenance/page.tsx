import React, { useEffect, useState } from 'react'
// import { CarMaintenance, columns } from "./columns"
import { DataTable } from "./data-table"
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, CheckCircle2, XCircle, Calendar, List, CheckCircle, Search, ChevronLeft, ChevronRight, Edit2, Edit, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { mileageOption } from '@/types/maintenance-option';
import { Input } from '@/components/ui/input';
import { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// const data: Payment[] = [
//   {
//     id: "728ed521",
//     amount: 134,
//     status: "pending",
//     username: "John Doe",
//     email: "johndoe@gmail.com",
//   },
//   {
//     id: "728ed522",
//     amount: 124,
//     status: "success",
//     username: "Jane Doe",
//     email: "janedoe@gmail.com",
//   },
//   {
//     id: "728ed523",
//     amount: 167,
//     status: "success",
//     username: "Mike Galloway",
//     email: "mikegalloway@gmail.com",
//   },
//   {
//     id: "728ed524",
//     amount: 156,
//     status: "failed",
//     username: "Minerva Robinson",
//     email: "minerbarobinson@gmail.com",
//   },
//   {
//     id: "728ed525",
//     amount: 145,
//     status: "success",
//     username: "Mable Clayton",
//     email: "mableclayton@gmail.com",
//   },
//   {
//     id: "728ed526",
//     amount: 189,
//     status: "pending",
//     username: "Nathan McDaniel",
//     email: "nathanmcdaniel@gmail.com",
//   },
//   {
//     id: "728ed527",
//     amount: 178,
//     status: "success",
//     username: "Myrtie Lamb",
//     email: "myrtielamb@gmail.com",
//   },
//   {
//     id: "728ed528",
//     amount: 190,
//     status: "success",
//     username: "Leona Bryant",
//     email: "leonabryant@gmail.com",
//   },
//   {
//     id: "728ed529",
//     amount: 134,
//     status: "failed",
//     username: "Aaron Willis",
//     email: "aaronwillis@gmail.com",
//   },
//   {
//     id: "728ed52a",
//     amount: 543,
//     status: "success",
//     username: "Joel Keller",
//     email: "joelkeller@gmail.com",
//   },
//   {
//     id: "728ed52b",
//     amount: 234,
//     status: "pending",
//     username: "Daniel Ellis",
//     email: "danielellis@gmail.com",
//   },
//   {
//     id: "728ed52c",
//     amount: 345,
//     status: "success",
//     username: "Gordon Kennedy",
//     email: "gordonkennedy@gmail.com",
//   },
//   {
//     id: "728ed52d",
//     amount: 335,
//     status: "failed",
//     username: "Emily Hoffman",
//     email: "emilyhoffman@gmail.com",
//   },
//   {
//     id: "728ed52e",
//     amount: 664,
//     status: "pending",
//     username: "Jeffery Garrett",
//     email: "jefferygarrett@gmail.com",
//   },
//   {
//     id: "728ed52f",
//     amount: 332,
//     status: "success",
//     username: "Ralph Baker",
//     email: "ralphbaker@gmail.com",
//   },
//   {
//     id: "728ed52g",
//     amount: 413,
//     status: "failed",
//     username: "Seth Fields",
//     email: "sethfields@gmail.com",
//   },
//   {
//     id: "728ed52h",
//     amount: 345,
//     status: "pending",
//     username: "Julia Webb",
//     email: "juliawebb@gmail.com",
//   },
//   {
//     id: "728ed52i",
//     amount: 754,
//     status: "success",
//     username: "Gary Banks",
//     email: "garybanks@gmail.com",
//   },
//   {
//     id: "728ed52j",
//     amount: 643,
//     status: "failed",
//     username: "Flora Chambers",
//     email: "florachambers@gmail.com",
//   },
//   {
//     id: "728ed52k",
//     amount: 543,
//     status: "pending",
//     username: "Steve Hanson",
//     email: "stevehanson@gmail.com",
//   },
//   {
//     id: "728ed52l",
//     amount: 324,
//     status: "success",
//     username: "Lola Robinson",
//     email: "lolarobinson@gmail.com",
//   },
//   {
//     id: "728ed52m",
//     amount: 123,
//     status: "pending",
//     username: "Ethel Waters",
//     email: "ethelwaters@gmail.com",
//   },
//   {
//     id: "728ed52n",
//     amount: 422,
//     status: "failed",
//     username: "Grace Edwards",
//     email: "graceedwards@gmail.com",
//   },
//   {
//     id: "728ed52o",
//     amount: 712,
//     status: "success",
//     username: "Sallie Wong",
//     email: "salliewong@gmail.com",
//   },
//   {
//     id: "728ed52p",
//     amount: 360,
//     status: "success",
//     username: "Bryan Gutierrez",
//     email: "bryangutierrez@gmail.com",
//   },
//   {
//     id: "728ed52q",
//     amount: 454,
//     status: "pending",
//     username: "Erik Rice",
//     email: "erikrice@gmail.com",
//   },
//   {
//     id: "728ed52r",
//     amount: 382,
//     status: "success",
//     username: "Jordan Atkins",
//     email: "jordanatkins@gmail.com",
//   },
//   {
//     id: "728ed52s",
//     amount: 328,
//     status: "failed",
//     username: "Bill Brewer",
//     email: "billbrewer@gmail.com",
//   },
//   {
//     id: "728ed52t",
//     amount: 250,
//     status: "success",
//     username: "Edwin Morris",
//     email: "edwinmorris@gmail.com",
//   },
//   {
//     id: "728ed52u",
//     amount: 658,
//     status: "success",
//     username: "Harold Becker",
//     email: "haroldbecker@gmail.com",
//   },
//   {
//     id: "728ed52v",
//     amount: 691,
//     status: "success",
//     username: "Hannah Rodriguez",
//     email: "hannahrodriguez@gmail.com",
//   },
//   {
//     id: "728ed52w",
//     amount: 969,
//     status: "success",
//     username: "Zachary Beck",
//     email: "zacharybeck@gmail.com",
//   },
//   {
//     id: "728ed52x",
//     amount: 617,
//     status: "failed",
//     username: "Frances Potter",
//     email: "francespotter@gmail.com",
//   },
//   {
//     id: "728ed52y",
//     amount: 173,
//     status: "success",
//     username: "Raymond Murray",
//     email: "raymondmurray@gmail.com",
//   },
//   {
//     id: "728ed52z",
//     amount: 843,
//     status: "success",
//     username: "Adam Sherman",
//     email: "adamsherman@gmail.com",
//   },
//   {
//     id: "728ed521f",
//     amount: 914,
//     status: "pending",
//     username: "Anne Cruz",
//     email: "annecruz@gmail.com",
//   },
// ]

type CarMaintenance = {
  id: number;
  mileage: string;
  item: string;
  price: number;
  model_id: number;
  car_model: {
      id: number;
      model: string;
  }
}

type Brand = {
  id: number;
  name: string;
}

type CarModel = {
  id: number;
  model: string;
  brand_id: number;
}

type Props = {
  carmaintenance: {
      data: CarMaintenance[];
      // current_page: number;
      // last_page: number;
      // per_page: number;
      // total: number;
      // from: number;
      // to: number;
  };
  brand: Brand;
  model: CarModel;
  flash?: {
      success?: string;
      error?: string;
  };
}



const TestPage = ({carmaintenance,brand,model,flash}:Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingMaintenance, setEditingMaintenance] = useState<CarMaintenance | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  // console.log(model);
  // const data = getData()

  useEffect(() => {
      // console.log('asdasd');
      if (flash?.success) {
          setToastMessage(flash.success);
          setToastType('success');
          setShowToast(true);
          // console.log('success');
      } else if (flash?.error) {
          setToastMessage(flash.error);
          setToastType('error');
          setShowToast(true);
          // console.log('error');
      }
  }, [flash]);

  useEffect(() => {
      if (showToast) {
          const timer = setTimeout(() => {
              setShowToast(false);
          }, 3000);
          return () => clearTimeout(timer);
      }
  }, [showToast]);

  const columns: ColumnDef<CarMaintenance>[] = [
    {
      accessorKey: "mileage",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mileage (km)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "item",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Item
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "price",
      header: "Price (RM)",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original
        // console.log('item',item);
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(carmaintenance.id.toString())}
              >
                Copy payment ID
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleEdit(item)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(model.id,item.id)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const { data, setData, post, put, processing, reset, delete: destroy } = useForm({
      mileage: '',
      item: '',
      price: '',
      model_id: model.id,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (editingMaintenance) {
          put(route('maintenance.update', [model.id,editingMaintenance.id]), {
              onSuccess: () => {
                  setIsOpen(false);
                  reset();
                  setEditingMaintenance(null);
              },
          });
      } else {
          post(route('maintenance.store',model.id), {
              onSuccess: () => {
                  setIsOpen(false);
                  reset();
              },
          });
      }
  };

  const handleEdit = (cm: CarMaintenance) => {
      setEditingMaintenance(cm);
      // console.log('model',editingMaintenance);
      setData({
        mileage: cm.mileage,
          item: cm.item,
          price: cm.price,
          model_id: cm.model_id?.toString()
      });
      setIsOpen(true);
  };

  const handleDelete = (modelId:number,cmId: number) => {
      destroy(route('maintenance.destroy', [modelId,cmId]));
  };
  
  return (
    <AppLayout>
      <Head title={model.model} />
      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background to-muted/20">
        {showToast && (
                              
            <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
                } text-white animate-in fade-in slide-in-from-top-5`}>
                {toastType === 'success' ? (
                    <CheckCircle2 className="h-5 w-5" />
                ) : (
                    <XCircle className="h-5 w-5" />
                )}
                <span>{toastMessage}</span>
            </div>
        )}
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{model?.model}</h1>                        
                <p className="text-muted-foreground mt-1">Manage library & reference for this model</p>                    
            </div>  
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger>
                    <a href="#" className="bg-primary hover:bg-primary/90 text-white shadow-lg px-5 py-2 rounded-sm">
                        Add Details
                    </a>
                </DialogTrigger>                        
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl">{editingMaintenance ? 'Edit Details' : 'Create New Details'}</DialogTitle> 
                        <DialogDescription>Here you can add new service details</DialogDescription>                           
                    </DialogHeader>                            
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="brand_id">Mileage</Label>                                    
                            <Select value={data.mileage}
                                onValueChange={(value: string) => setData('mileage', value)}
                            >
                                <SelectTrigger className="focus:ring-2 focus:ring-primary">
                                    <SelectValue placeholder="Select a mileage" />
                                </SelectTrigger>                                        
                                <SelectContent>
                                    <SelectGroup>
                                    {mileageOption.map((mile) => (
                                        <SelectItem key={mile.value} value={mile.value.toString()}>
                                            {mile.label.toUpperCase()}
                                        </SelectItem>
                                    ))}

                                    </SelectGroup>
                                </SelectContent>                                    
                            </Select>                                
                        </div> 
                        <div className="space-y-2">
                            <Label htmlFor="item">Item</Label>                                    
                            <Input id="item"
                                value={data.item}
                                onChange={(e) => setData('item', e.target.value)}
                                required className="focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>                                    
                            <Input id="price"
                            type='number'
                                value={data.price}
                                placeholder='RM'
                                onChange={(e) => setData('price', e.target.value)}
                                required className="focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg"
                            >
                            {editingMaintenance ? 'Update' : 'Create'}
                        </Button>
                    </form>
                </DialogContent>                    
            </Dialog>    
        </div>
        <DataTable columns={columns} data={carmaintenance?.data} />
      </div>
    </AppLayout>
  )
}

export default TestPage