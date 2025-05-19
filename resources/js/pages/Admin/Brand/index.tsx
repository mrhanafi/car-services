
import AppLayout from '@/layouts/app-layout'
import React, { useEffect, useState } from 'react'
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { Plus, Pencil, Trash2, CheckCircle2, XCircle, Calendar, List, CheckCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Head, router, useForm } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { DialogDescription } from '@radix-ui/react-dialog';
import { BreadcrumbItem } from '@/types';
import { ToastContainer, toast } from 'react-toastify';

type Brand = {
    id: number;
    name: string;
}

type Props = {
    brands: {
        data: Brand[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
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
        title: 'Brands',
        href: '/brands',
    },
];

export default  function Brand({brands,flash,filters}:Props) {
    const [isOpen, setIsOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');
    // const data =  getData()

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

    const handlePageChange = (page: number) => {
        router.get(route('brands.index'), {
            page,
            // search: searchTerm,
            // filter: completionFilter,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const { data, setData, post, put, processing, reset, delete: destroy } = useForm({
        name: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingBrand) {
            put(route('brands.update', editingBrand.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setEditingBrand(null);
                },
            });
        } else {
            post(route('brands.store'), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (brand: Brand) => {
        setEditingBrand(brand);
        setData({
            name: brand.name,
        });
        setIsOpen(true);
    };

    const handleDelete = (brandId: number) => {
        destroy(route('brands.destroy', brandId));
    };


    
   
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Brands" />
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
                        <h1 className="text-3xl font-bold tracking-tight">Brands</h1>                        
                        <p className="text-muted-foreground mt-1">Manage your brands and stay organized</p>                    
                        </div>             
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger>
                                <a href="#" className="bg-primary hover:bg-primary/90 text-white shadow-lg px-5 py-2 rounded-sm">
                                    Add Brand
                                </a>
                                {/* <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg">
                                    <Plus className="h-4 w-4 mr-2" />
                                    New Brand
                                </Button>                         */}
                            </DialogTrigger>                        
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle className="text-xl">{editingBrand ? 'Edit Brand' : 'Create New Brand'}</DialogTitle> 
                                    <DialogDescription>Here you can add new brand</DialogDescription>                           
                                </DialogHeader>                            
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Brand Name</Label>                                    
                                        <Input id="title"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required className="focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg"
                                        >
                                        {editingBrand ? 'Update' : 'Create'}
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
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>                                
                                </tr>                            
                            </thead>                            
                            <tbody className="[&_tr:last-child]:border-0">
                                {brands.data.map((brand) => (
                                    <tr key={brand.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle font-medium">{brand.name.toUpperCase()}</td>
                                        <td className="p-4 align-middle text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleEdit(brand)}
                                                    className="hover:bg-primary/10 hover:text-primary"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>                                                
                                                <Button variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(brand.id)}
                                                    className="hover:bg-destructive/10 hover:text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>                                            
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {brands.data.length === 0 && (
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
                        Showing {brands.from} to {brands.to} of {brands.total} results
                    </div>                    <div className="flex items-center space-x-2">
                        <Button variant="outline"
                            size="icon"
                            onClick={() => handlePageChange(brands.current_page - 1)}
                            disabled={brands.current_page === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>                        
                        <div className="flex items-center space-x-1">
                            {Array.from({ length: brands.last_page }, (_, i) => i + 1).map((page) => (
                                <Button key={page}
                                    variant={page === brands.current_page ? "default" : "outline"}
                                    size="icon"
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>                        
                        <Button variant="outline"
                            size="icon"
                            onClick={() => handlePageChange(brands.current_page + 1)}
                            disabled={brands.current_page === brands.last_page}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>                   
                        </div>                
                </div>            
                
            </div>
        </AppLayout>
    )
  }