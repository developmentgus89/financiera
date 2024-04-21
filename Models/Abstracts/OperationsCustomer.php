<?php

    abstract class OperationsCustomer {
                
        /**
         * setCreateCustomer
         *
         * @param  array $data
         * @return array
         */
        abstract protected function setCreateCustomer(array $data): ?array;
                
        /**
         * setUpdateCustomer
         *
         * @param  int $id
         * @param  array $data
         * @return array
         */
        abstract protected function setUpdateCustomer(int $id, array $data): ?array;
        
        /**
         * setDeleteCustomer
         *
         * @param  int $id
         * @return array
         */
        abstract protected function setDeleteCustomer(int $id): ?array;
        
        /**
         * getRowsCustomers
         *
         * @return array
         */
        abstract protected function getRowsCustomers(): ?array;
        
        /**
         * getRowCustomer
         *
         * @param  int $id
         * @return array
         */
        abstract protected function getRowCustomer(int $id): ?array;

    }