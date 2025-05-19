import AppLayout from '@/layouts/app-layout'
import { Head, router, useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, CheckCircle2, XCircle, Calendar, List, CheckCircle, Search, ChevronLeft, ChevronRight, Edit2, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
import { Button } from '@/components/ui/button';
import { mileageOption } from '@/types/maintenance-option';

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
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    brand: Brand;
    model: CarModel;
    flash?: {
        success?: string;
        error?: string;
    };
}



const CarMaintenance = ({carmaintenance,brand,model,flash}:Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editingMaintenance, setEditingMaintenance] = useState<CarMaintenance | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    // console.log('data',model);


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
        
        mileage: '',
        item: '',
        price: '',
        model_id: model.id,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingMaintenance) {
            put(route('maintenance.update', editingMaintenance.id), {
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
        // setEditingModel(model);
        // console.log('model',editingModel);
        // setData({
        //     model: model.model,
        //     brand_id: model.brand_id.toString(),
        // });
        // setIsOpen(true);
    };

    const handleDelete = (modelId:number,cmId: number) => {
        destroy(route('maintenance.destroy', [modelId,cmId]));
    };

    const handlePageChange = (page: number) => {
        router.get(route('models.show',model.id), {
            page,
            // search: searchTerm,
            // filter: completionFilter,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
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
                                    onValueChange={(value:string) => setData('mileage', value)}
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
            <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Mileage (km)</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Item</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price (RM)</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>                                
                            </tr>                            
                        </thead>                            
                        <tbody className="[&_tr:last-child]:border-0">
                            {carmaintenance.data.map((item) => (
                                <tr key={item.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle font-medium">{item.mileage}</td>
                                    <td className="p-4 align-middle font-medium">{item.item}</td>
                                    <td className="p-4 align-middle font-medium">{item.price}</td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(item)}
                                                className="hover:bg-primary/10 hover:text-primary"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>                                                
                                            <Button variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(model.id,item.id)}
                                                className="hover:bg-destructive/10 hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>                                            
                                                                                        
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {carmaintenance.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-4 text-center text-muted-foreground">
                                        No tasks foreground                                        
                                    </td>
                                </tr>
                            )}
                        </tbody>                        
                    </table>                    
                </div>                
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between px-2">
                <div className="text-sm text-muted-foreground">
                    Showing {carmaintenance.from} to {carmaintenance.to} of {carmaintenance.total} results
                </div>                    <div className="flex items-center space-x-2">
                <Button variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(carmaintenance.current_page - 1)}
                    disabled={carmaintenance.current_page === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>                        
                <div className="flex items-center space-x-1">
                    {Array.from({ length: carmaintenance.last_page }, (_, i) => i + 1).map((page) => (
                        <Button key={page}
                            variant={page === carmaintenance.current_page ? "default" : "outline"}
                            size="icon"
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </Button>
                    ))}
                </div>                        
                <Button variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(carmaintenance.current_page + 1)}
                    disabled={carmaintenance.current_page === carmaintenance.last_page}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>                   
                </div>                
            </div> 
        </div>
    </AppLayout>
  )
}

export default CarMaintenance