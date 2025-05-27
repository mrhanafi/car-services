import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react'
import { Check, CheckCircle2, ChevronsUpDown, Edit, Trash2, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from '@/lib/utils';
import { mileageOption } from '@/types/maintenance-option';
import axios from 'axios';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { Textarea } from '@/components/ui/textarea';
  
  type recordDetails = {
    id: number;
    item: string;
    price: number;
}

type CarRecords = {
    id: number;
    current_mileage: string;
    date_of_service: Date;
    mycar_id: number;
    record_details: recordDetails[];
}



type MyCar = {
    id: number;
    title?: string | undefined;
    brand: string;
    brand_id: number;
    model: string;
    model_id: number;
    user_id: number;
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

type CarMaintenance = {
    id: number;
    mileage: string;
    item: string;
    quantity: number;
    price: number;
    model_id: number;
}

type Props = {
    mycar: MyCar;
    carrecords: CarRecords[];
    services: CarMaintenance[];
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Car',
        href: '/my-car',
    },
];

const DetailsPage = ({mycar,carrecords,flash}:Props) => {
    const [isOpen, setIsOpen] = useState(false);
        const [editingCar, setEditingCar] = useState<MyCar | null>(null);
        const [showToast, setShowToast] = useState(false);
        const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [serviceDropdown, setServiceDropdown] = useState<CarMaintenance[]>([]);

    
    console.log(mycar);

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
    
        const { data, setData, post, put, processing, reset, delete: destroy } = useForm({
            current_mileage: '',
            date_of_service: '',
            mileage: '',
            remark: '',
            // item: '',
        });
    
        // useEffect(() => {
        //     if (data.mileage) {
        //       axios
        //         .post('/my-car/services/'+mycar.id, { mileage: data.mileage })
        //         .then((response) => {
        //           console.log('maintenance',response)
        //           setServiceDropdown(response.data)
        //           setData('item', '') // reset state selection
        //         })
        //         .catch((error) => {
        //           console.error('Error fetching states:', error)
        //           setServiceDropdown([])
        //         })
        //     } else {
        //         setServiceDropdown([])
        //       setData('item', '')
        //     }
        //   }, [data.mileage]);
    
    

    // const handleAdd = (car: MyCar) => {
    //     router.get(route('mycar.details.add', car.id))
    // }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (editingCar) {
              put(route('mycar.update', editingCar.id), {
                  onSuccess: () => {
                      setIsOpen(false);
                      reset();
                      setEditingCar(null);
                  },
              });
          } else {
              post(route('mycar.index.service.store',mycar.id), {
                  onSuccess: () => {
                      setIsOpen(false);
                      reset();
                  },
              });
          }
    };
    
    const handleEdit = (record: CarRecords) => {
        router.get(route('mycar.details.records.show',[mycar.id,record.id]))
    }

    const handleDelete = (carrecordId: number) => {
        destroy(route('mycar.details.destroy', carrecordId));
    };
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title='My Cars' />
        <div className='flex h-full flex-1 flex-col gap-4 rounded-xl p-4'>
            {showToast && (
            <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg ${toastType === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white animate-in fade-in slide-in-from-top-5`}>
                {toastType === 'success' ? (
                    <CheckCircle2 className='h-5 w-5'/>
                ): (
                    <XCircle className='h-5 w-5'/>
                )}
                <span>{toastMessage}</span>
            </div>
            )}
            <div className="flex justify-between items-center">
                <div>
                      <h1 className="text-3xl font-bold tracking-tight">{mycar.title }</h1>                        
                      <p className="text-muted-foreground mt-1">{mycar.brand.toUpperCase()} - {mycar.model}</p>  
                  </div> 
                  {/* <a href="#" onClick={() =>handleAdd(mycar)} className="bg-primary hover:bg-primary/90 text-white shadow-lg px-5 py-2 rounded-sm">
                                Add Details
                            </a> */}
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger>
                            <a href="#" className="bg-primary hover:bg-primary/90 text-white shadow-lg px-5 py-2 rounded-sm">
                                Add Details
                            </a>
                            </DialogTrigger>                        
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle className="text-xl">{editingCar ? 'Edit Record' : 'Add New Car'}</DialogTitle> 
                                    <DialogDescription>Here you can add your new car</DialogDescription>                           
                                </DialogHeader>                            
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="current_mileage">Current Mileage (km)</Label>                                    
                                        <Input id="current_mileage" type='number'
                                            value={data.current_mileage}
                                            onChange={(e) => setData('current_mileage', e.target.value)}
                                            required className="focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                                <Label htmlFor="date_of_service">Date of Services</Label>                                    
                                                <Input id="date_of_service"
                                                    type="date"
                                                    value={data.date_of_service}
                                                    onChange={(e) => setData('date_of_service', e.target.value)}
                                                    className="focus:ring-2 focus:ring-primary w-auto"
                                                />
                                    </div>
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
                                        <Label htmlFor="brand_id">Remarks</Label>
                                        <Textarea value={data.remark ? data.remark : ''} onChange={(e) => setData('remark', e.target.value)} />
                                  </div> 
                                {/* <div className="space-y-2">
                                    <Label htmlFor="brand_id">Mileage</Label>                                    
                                    <Select value={data.mileage}
                                    onValueChange={(value:string) => setData('mileage', value)}>
                                        <SelectTrigger className="focus:ring-2 focus:ring-primary">
                                            <SelectValue placeholder="Select a mileage" />
                                        </SelectTrigger>                                        
                                        <SelectContent>
                                            <SelectGroup>
                                            {mileageOption.map((mile) => (
                                                <SelectItem key={mile.value} value={mile.value}>
                                                    {mile.label.toUpperCase()}
                                                </SelectItem>
                                            ))}

                                            </SelectGroup>
                                        </SelectContent>                                    
                                    </Select>                                
                              </div>  */}
                              {/* <div className="space-y-2">
                                    <Label htmlFor="brand_id">Select Service</Label>                                    
                                    <Select value={data.item}
                                        onValueChange={(value: string) => setData('item', value)}
                                        disabled={!serviceDropdown.length}
                                    >
                                        <SelectTrigger className="focus:ring-2 focus:ring-primary">
                                            <SelectValue placeholder="Select a list" />
                                        </SelectTrigger>                                        
                                        <SelectContent>
                                            {serviceDropdown.map((item) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                    {item.item}
                                                </SelectItem>))}
                                        </SelectContent>                                    
                                    </Select>                                
                                </div>  */}
                              
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg"
                                >
                                {editingCar ? 'Update' : 'Create'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog> 
              </div>  
                  {carrecords.map((rec) => (
              <div className="rounded-md border p-4" key={rec.id}>
                      
                <Collapsible>
                    <div className="flex items-center justify-between space-x-4 px-4">
                        <h4 className="text-sm font-semibold">
                        Mileage: {rec.current_mileage} km
                          </h4>
                                  <div>
                                  <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <ChevronsUpDown className="h-4 w-4" />
                                    <span className="sr-only">Toggle</span>
                                </Button>
                                      </CollapsibleTrigger>
                                  <Button variant="ghost" size="sm" onClick={() => handleEdit(rec)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Toggle</span>
                            </Button>
                            
                                      <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(rec.id)}
                            className="text-destructive hover:text-destructive/90"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                            
                          </div>
                    </div>
                          <CollapsibleContent className="space-y-2 mt-4">
                              {/* Perodua Engine Oil Fully Syn 0W-20 3.5L */}
                              {rec.record_details.length > 0 ?rec.record_details.map((detail) => (
                                <div key={detail.id} className="flex items-center justify-between rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                                    <p>
                                          
                                          {detail.item}
                                    </p>
                                    <h4 className="text-sm font-semibold">
                                        RM {detail.price}
                                    </h4>
                                </div>
                                
                              )) : <div className='pl-4'>No data to display</div>}
                        {/* <div className="flex items-center justify-between rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                            <p>
                                Drain Plug Gasket - Engine Oil
                            </p>
                            <h4 className="text-sm font-semibold">
                              RM 3.80
                            </h4>
                        </div>
                        <div className="flex items-center justify-between rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
                        <p>
                        Engine Oil Filter
                            </p>
                            <h4 className="text-sm font-semibold">
                              RM 12.50
                            </h4>
                              
                        </div> */}
                    </CollapsibleContent>
                </Collapsible>
            </div>
                  ))}
        </div>
    </AppLayout>
  )
}

export default DetailsPage