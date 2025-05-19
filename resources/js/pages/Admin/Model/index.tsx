import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem } from '@/types';
import React, { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, CheckCircle2, XCircle, Calendar, List, CheckCircle, Search, ChevronLeft, ChevronRight, Edit2, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

type CarModel = {
    id: number;
    model: string;
    brand_id: string;
    car_brand:{
        id:number;
        name:string;
    }
}

type Brand = {
    id: number;
    name: string;
}

type Props = {
    models: {
        data: CarModel[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    brands: Brand[];
    filters: {
        search: string;
        filter: string;
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Car Models',
        href: '/car-models',
    },
];

const CarModel = ({models,flash,brands}:Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editingModel, setEditingModel] = useState<CarModel | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    // console.log(models);
    useEffect(() => {
        // console.log('asdasd');
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
            console.log('success');
        } else if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
            console.log('error');
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
        model: '',
        brand_id: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingModel) {
            put(route('cars.update', editingModel.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setEditingModel(null);
                },
            });
        } else {
            post(route('cars.store'), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (model: CarModel) => {
        setEditingModel(model);
        // console.log('model',editingModel);
        setData({
            model: model.model,
            brand_id: model.brand_id.toString(),
        });
        setIsOpen(true);
    };

    const handleShow = (model: CarModel) => {
        router.get(route('cars.show',model.id))
    }

    const handleDelete = (brandId: number) => {
        destroy(route('cars.destroy', brandId));
    };

    const handlePageChange = (page: number) => {
        router.get(route('cars.index'), {
            page,
            // search: searchTerm,
            // filter: completionFilter,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title='Car Models' />
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
                    <h1 className="text-3xl font-bold tracking-tight">Car Models</h1>                        
                    <p className="text-muted-foreground mt-1">Manage your car models and stay organized</p>                    
                </div>             
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger>
                        <a href="#" className="bg-primary hover:bg-primary/90 text-white shadow-lg px-5 py-2 rounded-sm">
                            Add Car Model
                        </a>
                    </DialogTrigger>                        
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="text-xl">{editingModel ? 'Edit Brand' : 'Create New Brand'}</DialogTitle> 
                            <DialogDescription>Here you can add new car model</DialogDescription>                           
                        </DialogHeader>                            
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Car Model Name</Label>                                    
                                <Input id="title"
                                    value={data.model}
                                    onChange={(e) => setData('model', e.target.value)}
                                    required className="focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="brand_id">List</Label>                                    
                                <Select value={data.brand_id}
                                    onValueChange={(value:string) => setData('brand_id', value)}
                                >
                                    <SelectTrigger className="focus:ring-2 focus:ring-primary">
                                        <SelectValue placeholder="Select a list" />
                                    </SelectTrigger>                                        
                                    <SelectContent>
                                        {brands.map((brand) => (
                                            <SelectItem key={brand.id} value={brand.id.toString()}>
                                                {brand.name.toUpperCase()}
                                            </SelectItem>))}
                                    </SelectContent>                                    
                                </Select>                                
                            </div> 
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg"
                                >
                                {editingModel ? 'Update' : 'Create'}
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
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Model Name</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Brand</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>                                
                            </tr>                            
                        </thead>                            
                        <tbody className="[&_tr:last-child]:border-0">
                            {models.data.map((model) => (
                                <tr key={model.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle font-medium">{model.model.toUpperCase()}</td>
                                    <td className="p-4 align-middle font-medium">{model?.car_brand?.name.toUpperCase()}</td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost"
                                                size="icon"
                                                onClick={() => handleShow(model)}
                                                className="hover:bg-primary/10 hover:text-primary"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>  
                                            <Button variant="ghost"
                                                size="icon"
                                                onClick={() => handleEdit(model)}
                                                className="hover:bg-primary/10 hover:text-primary"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>                                                
                                            <Button variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(model.id)}
                                                className="hover:bg-destructive/10 hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>                                            
                                                                                      
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {models.data.length === 0 && (
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
                    Showing {models.from} to {models.to} of {models.total} results
                </div>                    <div className="flex items-center space-x-2">
                <Button variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(models.current_page - 1)}
                    disabled={models.current_page === 1}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>                        
                <div className="flex items-center space-x-1">
                    {Array.from({ length: models.last_page }, (_, i) => i + 1).map((page) => (
                        <Button key={page}
                            variant={page === models.current_page ? "default" : "outline"}
                            size="icon"
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </Button>
                    ))}
                </div>                        
                <Button variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(models.current_page + 1)}
                    disabled={models.current_page === models.last_page}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>                   
                </div>                
            </div>  
        </div>
    </AppLayout>
  )
}

export default CarModel