import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { CheckCircle2, Pencil, Trash2, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { mileageOption } from '@/types/maintenance-option';
import axios from 'axios';
import { Textarea } from '@/components/ui/textarea';

type recordDetails = {
    id: number;
    item: string;
    remark: string;
    service_id: number;
    price: number;
}

type CarRecords = {
    id: number;
    current_mileage: string;
    date_of_service: Date;
    service_mileage: string;
    remark: string;
    mycar_id: number;
    
    record_details: recordDetails[];
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
    // mycar: MyCar;
    carrecords: CarRecords;
    services: CarMaintenance[];
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Car Record Details',
        href: '/my-car',
    },
];


function ViewDetails({ carrecords,services, flash }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenService, setIsOpenService] = useState(false);
    const [editingRecord, setEditingRecord] = useState<CarRecords | null>(carrecords);
    const [editingService, setEditingService] = useState<recordDetails | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    const [dataDropdown, setDataDropdown] = useState<CarMaintenance[]>([]);
    
    // console.log(carrecords);
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

    // useEffect(() => {
    //     if (serviceData.mileage) {
    //       axios
    //         .post('/my-car/get-carmodels', { brand_id: data.brand })
    //         .then((response) => {
    //           // console.log(response)
    //           setCarModelDropdown(response.data)
    //           setData('model', '') // reset state selection
    //         })
    //         .catch((error) => {
    //           console.error('Error fetching states:', error)
    //           setCarModelDropdown([])
    //         })
    //     } else {
    //       setCarModelDropdown([])
    //       setData('model', '')
    //     }
    //   }, [data.brand]);

    

    const {
        data: recordData,
        setData: setRecordData,
        post: postRecord,
        put: putRecord,
        processing: processingRecord,
        reset: resetRecord,
        delete: destroyRecord
    } = useForm({
        current_mileage: '',
        date_of_service: '',
        remark: '',
        service_mileage: '',
        // item: '',
    });

    const {
        data: serviceData,
        setData: setServiceData,
        post: postService,
        put: putService,
        processing: processingService,
        reset: resetService,
        delete: destroyService
    } = useForm({
        // id: '',
        item: '',
        // date_of_service: '',
        // mileage: '',
        remark: '',
        service_id:'',
        // item: '',
    });

    useEffect(() => {
        // handleEditRecord(carrecords);
        setEditingRecord(carrecords);
        setRecordData({
            current_mileage: carrecords.current_mileage,
            date_of_service: carrecords.date_of_service.toString(),
            service_mileage: carrecords.service_mileage,
            remark: carrecords.remark,
        });
    }, []);

    const handleSubmitRecord = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
            putRecord(route('mycar.details.update', editingRecord?.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    // resetRecord();
                    // setEditingRecord(null);
                },
            });
    };
    const handleSubmitService = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
          if (editingService) {
              putService(route('mycar.details.records.update', [carrecords.mycar_id,editingService.id]), {
                  onSuccess: () => {
                      setIsOpen(false);
                      resetService();
                      setEditingService(null);
                  },
              });
          } else {
              postService(route('mycar.details.records.store',[carrecords.mycar_id,carrecords.id]), {
                  onSuccess: () => {
                      setIsOpenService(false);
                      resetService();
                  },
              });
          }
    };

    const handleEditRecord = (record:CarRecords) => {
        setEditingRecord(record);
        setRecordData({
            current_mileage: record.current_mileage,
            date_of_service: record.date_of_service.toString(),
            service_mileage: record.service_mileage,
            remark: record.remark,
        });
        setIsOpen(true);
    }

    const handleEditService = (data: recordDetails) => {
        setEditingService(data);
        console.log('model',data);
        setServiceData({
            item: data.item,
            service_id: data.service_id.toString(),
            remark: data.remark,
        });
        setIsOpenService(true);
    };

    const handleDeleteService = (serviceId: number) => {
        destroyService(route('mycar.details.records.destroy', serviceId));
    };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
          <Head title='My Car Record Details' />
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
                        <h1 className="text-3xl font-bold tracking-tight">Details</h1>                        
                    </div>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger>
                                <a href="#" className="bg-primary hover:bg-primary/90 text-white shadow-lg px-5 py-2 rounded-sm">
                                    Edit Record
                                </a>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl">Edit Record</DialogTitle> 
                                        <DialogDescription>Here you can add your new car</DialogDescription>
                                    </DialogHeader>                            
                                    <form onSubmit={handleSubmitRecord} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="current_mileage">Current Mileage (km)</Label>
                                            <Input id="current_mileage"
                                                value={recordData.current_mileage}
                                                onChange={(e) => setRecordData('current_mileage', e.target.value)}
                                                required className="focus:ring-2 focus:ring-primary"
                                            />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="date_of_service">Date of Services</Label>
                                        <Input id="date_of_service"
                                            type="date"
                                            value={recordData.date_of_service}
                                            onChange={(e) => setRecordData('date_of_service', e.target.value)}
                                            className="focus:ring-2 focus:ring-primary w-auto"
                                        />
                                    </div> 
                                    <div className="space-y-2">
                                            <Label htmlFor="brand_id">Mileage</Label>
                                            <Select value={recordData.service_mileage}
                                                onValueChange={(value: string) => setRecordData('service_mileage', value)}
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
                                            <Textarea value={recordData.remark ? recordData.remark : ''} onChange={(e) => setRecordData('remark', e.target.value)} />                             
                                    </div> 
                                <Button
                                    type="submit"
                                    disabled={processingRecord}
                                    className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg"
                                    >
                                    Update
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>   
                </div>
                <div>
                    <p className="text-muted-foreground mt-1"><strong>Current mileage:</strong> {carrecords.current_mileage } km</p>  
                    <p className="text-muted-foreground mt-1"><strong>Date of Service:</strong> {carrecords.date_of_service.toString()}</p>  
                    <p className="text-muted-foreground mt-1"><strong>Remark:</strong> {carrecords.remark }</p>  
                </div>
              
                <Separator />
              <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Services</h1>                        
                </div>
                  <Dialog open={isOpenService} onOpenChange={setIsOpenService}>
                      <DialogTrigger>
                            <a href="#" className="bg-primary hover:bg-primary/90 text-white shadow-lg px-5 py-2 rounded-sm">
                                Add Services
                            </a>
                      </DialogTrigger> 
                      <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="text-xl">Add New Service</DialogTitle> 
                            <DialogDescription>Here you can add service listed below</DialogDescription> 
                              <form onSubmit={handleSubmitService} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="brand_id">Service</Label>                                    
                                        <Select value={serviceData.service_id.toString()}
                                            onValueChange={(value: string) => setServiceData('service_id', value.toString())}
                                        >
                                            <SelectTrigger className="focus:ring-2 focus:ring-primary">
                                                <SelectValue placeholder="Select a service" />
                                            </SelectTrigger>                                        
                                            <SelectContent>
                                                <SelectGroup>
                                                {services.map((service) => (
                                                    <SelectItem key={service.id} value={service.id.toString()}>
                                                        {service.item.toUpperCase()}
                                                    </SelectItem>
                                                ))}
            
                                                </SelectGroup>
                                            </SelectContent>                                    
                                        </Select>                                
                                  </div> 
                                  <div className="space-y-2">
                                        <Label htmlFor="brand_id">Remarks</Label>                                    
                                        <Textarea value={serviceData.remark ? serviceData.remark : ''} onChange={(e) => setServiceData('remark', e.target.value)} />                             
                                  </div> 
                                  <Button
                                        type="submit"
                                        disabled={processingService}
                                        className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg"
                                        >
                                        {editingService ? 'Update' : 'Create'}
                                    </Button>
                              </form>
                          </DialogHeader>
                      </DialogContent>
                    </Dialog>
              </div>
              <div className='pt-4 space-y-2'>
                  {carrecords.record_details.map((item) => (
                <div key={item.id} className='border-1 rounded-sm flex flex-row items-center justify-between p-4'>
                      <div>
                          <h4 className='font-bold'>
                          {item.item}
                          </h4>
                              <p>{ item?.remark}</p>
                      </div>
                      <div className='items-center'>
                      <Button variant="ghost"
                            size="icon"
                            onClick={() => handleEditService(item)}
                            className="hover:bg-primary/10 hover:text-primary"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>                                                
                        <Button variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteService(item.id)}
                            className="hover:bg-destructive/10 hover:text-destructive"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button> 
                      </div>
                </div>
                      
                  ))}
                  
              </div>
          </div>
    </AppLayout>
  )
}

export default ViewDetails
